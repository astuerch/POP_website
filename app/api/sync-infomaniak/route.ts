import https from "node:https";
import {NextResponse} from "next/server";

import {upsertEventContact, type EventRegistrant} from "@/lib/brevo-contact";

// Must run on Node (not Edge): we use node:https to control raw headers.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Syncs Infomaniak ticketing registrations into Brevo.
 *
 * Runs daily via Vercel Cron (see vercel.json) — a free alternative to a paid
 * Zapier plan. Can also be triggered manually:
 *
 *   GET /api/sync-infomaniak?secret=<BREVO_WEBHOOK_SECRET>
 *   GET /api/sync-infomaniak?secret=...&days=90   → widen the lookback window
 *   GET /api/sync-infomaniak?secret=...&probe=1   → inspect the raw payload
 *                                                   without writing to Brevo
 *
 * Data model: the ticket list already carries each buyer's name and email, and
 * the customer list carries the period custom fields (Age Range, Job Field,
 * Region) plus the newsletter opt-in. So the whole sync needs three API calls
 * regardless of how many people registered — no per-order lookups.
 *
 * Auth (both headers are required — verified against the live API):
 *   `key`           = ticketing shop API key with "Ticket office access", and
 *   `Authorization` = an Infomaniak Manager API token, sent RAW (no "Bearer").
 *
 * Env vars:
 *   INFOMANIAK_TICKETING_API_KEY    — Ticketing → Store/Go Live → API Access
 *   INFOMANIAK_TICKETING_CREDENTIAL — Manager → Profile → API tokens
 *   BREVO_API_KEY, BREVO_EVENT_LIST_ID, BREVO_NEWSLETTER_LIST_ID
 *   BREVO_WEBHOOK_SECRET, CRON_SECRET (set so Vercel Cron can authenticate)
 *   POP_EVENT_LABEL                 — optional, defaults to "POP 02"
 */

const INFOMANIAK_BASE = "https://etickets.infomaniak.com/api/shop";

/**
 * Infomaniak requires a non-standard `key` header. Platform `fetch`
 * implementations normalise/drop it, so we issue the request with Node's raw
 * HTTP client, which sends header names exactly as written.
 */
function rawGet(
  url: string,
  headers: Record<string, string>,
): Promise<{status: number; body: string}> {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const request = https.request(
      {
        hostname: target.hostname,
        path: `${target.pathname}${target.search}`,
        method: "GET",
        headers,
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () =>
          resolve({status: response.statusCode ?? 0, body}),
        );
      },
    );
    request.on("error", reject);
    request.setTimeout(15_000, () => request.destroy(new Error("timeout")));
    request.end();
  });
}

// Vercel Cron authenticates with CRON_SECRET; manual runs use ?secret=.
function isAuthorised(request: Request): boolean {
  const secret = process.env.BREVO_WEBHOOK_SECRET;
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization") ?? "";
  const bearer = auth.replace(/^Bearer\s+/i, "").trim();
  const provided =
    bearer || new URL(request.url).searchParams.get("secret") || "";

  if (cronSecret && bearer === cronSecret) return true;
  return Boolean(secret) && provided === secret;
}

/** Picks the first non-empty string from a set of candidate keys. */
function pick(source: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

const normaliseLabel = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "_");

/**
 * Dropdown custom fields come back as opaque option ids ("tOption_2"). Walks a
 * form definition and collects every id → human label pair it can find.
 */
function collectOptionLabels(
  node: unknown,
  map: Map<string, string>,
): Map<string, string> {
  if (Array.isArray(node)) {
    for (const item of node) collectOptionLabels(item, map);
    return map;
  }
  if (!node || typeof node !== "object") return map;

  const entries = Object.entries(node as Record<string, unknown>);

  for (const [key, value] of entries) {
    if (/^tOption_\d+$/i.test(key) && typeof value === "string") {
      map.set(key, value);
    }
  }

  const idEntry = entries.find(
    ([, value]) => typeof value === "string" && /^tOption_\d+$/i.test(value),
  );
  if (idEntry) {
    const labelEntry = entries.find(
      ([key, value]) =>
        typeof value === "string" &&
        /label|name|title|text|value/i.test(key) &&
        !/^tOption_\d+$/i.test(value),
    );
    if (labelEntry) map.set(idEntry[1] as string, labelEntry[1] as string);
  }

  for (const [, value] of entries) collectOptionLabels(value, map);
  return map;
}

/** Parses a JSON list response that may be wrapped in {data:[…]}. */
function toArray(body: string, ...keys: string[]): Array<Record<string, unknown>> {
  try {
    const parsed = JSON.parse(body) as unknown;
    let data: unknown = parsed;
    for (const key of keys) {
      const nested = (parsed as Record<string, unknown>)?.[key];
      if (nested !== undefined) {
        data = nested;
        break;
      }
    }
    return Array.isArray(data) ? (data as Array<Record<string, unknown>>) : [];
  } catch {
    return [];
  }
}

/** Runs async work over a list with bounded concurrency. */
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let cursor = 0;

  async function run(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(
    Array.from({length: Math.min(limit, items.length)}, () => run()),
  );
  return results;
}

export async function GET(request: Request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({message: "Unauthorized."}, {status: 401});
  }

  const startedAt = Date.now();
  const apiKey = process.env.INFOMANIAK_TICKETING_API_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  if (!apiKey || !brevoKey) {
    return NextResponse.json(
      {
        message:
          "Missing config: INFOMANIAK_TICKETING_API_KEY and BREVO_API_KEY are required.",
        configured: false,
      },
      {status: 503},
    );
  }

  const parsedEventList = Number(process.env.BREVO_EVENT_LIST_ID);
  if (!Number.isFinite(parsedEventList)) {
    return NextResponse.json(
      {
        message:
          "BREVO_EVENT_LIST_ID is missing or not a number — set it in Vercel (event list id, e.g. 4) and redeploy.",
        configured: false,
      },
      {status: 503},
    );
  }
  const eventListId = parsedEventList;

  const parsedNewsletterList = Number(
    process.env.BREVO_NEWSLETTER_LIST_ID ?? process.env.BREVO_LIST_ID,
  );
  const newsletterListId = Number.isFinite(parsedNewsletterList)
    ? parsedNewsletterList
    : null;

  const params = new URL(request.url).searchParams;
  const probe = params.get("probe") === "1";
  const days = Math.min(Number(params.get("days")) || 60, 365);
  const eventLabel =
    params.get("event") || process.env.POP_EVENT_LABEL || "POP 02";

  const begin = new Date(Date.now() - days * 86_400_000)
    .toISOString()
    .slice(0, 10);

  const credential = process.env.INFOMANIAK_TICKETING_CREDENTIAL;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": "en_GB",
    key: apiKey,
    ...(credential ? {Authorization: credential} : {}),
  };

  // Three calls total, fetched in parallel — this is what keeps the function
  // fast no matter how many people have registered.
  let ticketsRes: {status: number; body: string};
  let customersRes: {status: number; body: string};
  let formRes: {status: number; body: string};
  try {
    [ticketsRes, customersRes, formRes] = await Promise.all([
      rawGet(`${INFOMANIAK_BASE}/tickets?limit=500&begin=${begin}`, headers),
      rawGet(`${INFOMANIAK_BASE}/customers?limit=500`, headers),
      rawGet(`${INFOMANIAK_BASE}/customers/form`, headers),
    ]);
  } catch {
    return NextResponse.json(
      {message: "Could not reach Infomaniak."},
      {status: 502},
    );
  }

  if (ticketsRes.status < 200 || ticketsRes.status >= 300) {
    return NextResponse.json(
      {
        message: "Infomaniak rejected the request.",
        status: ticketsRes.status,
        detail: ticketsRes.body.slice(0, 300),
      },
      {status: 502},
    );
  }

  const tickets = toArray(ticketsRes.body, "data", "tickets");
  const customers = toArray(customersRes.body, "data", "customers");

  // Index customers by email: this is where the period custom fields and the
  // newsletter opt-in live.
  const customerByEmail = new Map<string, Record<string, unknown>>();
  for (const customer of customers) {
    const email = pick(customer, ["email", "mail"]).toLowerCase();
    if (email) customerByEmail.set(email, customer);
  }

  const optionLabels = new Map<string, string>();
  if (formRes.status >= 200 && formRes.status < 300) {
    try {
      collectOptionLabels(JSON.parse(formRes.body) as unknown, optionLabels);
    } catch {
      // Option labels are cosmetic; fall back to the configured list order.
    }
  }

  const readable = (value: string): string => {
    if (!/^tOption_\d+$/i.test(value)) return value;
    const known = optionLabels.get(value);
    if (known) return known;
    const fallback = (process.env.INFOMANIAK_AGE_RANGE_OPTIONS ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
    return fallback[Number(value.split("_")[1]) - 1] ?? value;
  };

  /** Builds one registrant from a ticket plus its customer record. */
  function toRegistrant(
    ticket: Record<string, unknown>,
  ): EventRegistrant | null {
    const nested = ticket.customer;
    const buyer =
      nested && typeof nested === "object" && !Array.isArray(nested)
        ? (nested as Record<string, unknown>)
        : {};

    const email = pick(buyer, ["email", "mail"]) || pick(ticket, ["email"]);
    if (!email.includes("@")) return null;

    const customer = customerByEmail.get(email.toLowerCase()) ?? {};

    // Period custom fields arrive as {"Age Range": "tOption_2", …}
    const custom: Record<string, string> = {};
    const rawCustom = customer.custom_fields;
    if (rawCustom && typeof rawCustom === "object" && !Array.isArray(rawCustom)) {
      for (const [label, value] of Object.entries(
        rawCustom as Record<string, unknown>,
      )) {
        if (typeof value === "string" || typeof value === "number") {
          custom[normaliseLabel(label)] = readable(String(value).trim());
        }
      }
    }

    const newsletterRaw = customer.newsletter;
    const newsletter =
      newsletterRaw === true ||
      newsletterRaw === 1 ||
      (typeof newsletterRaw === "string" &&
        ["1", "true", "yes", "oui", "ja"].includes(
          newsletterRaw.trim().toLowerCase(),
        ));

    return {
      email,
      firstName:
        pick(buyer, ["firstname", "first_name"]) ||
        pick(customer, ["firstname", "first_name"]),
      surname:
        pick(buyer, ["lastname", "last_name"]) ||
        pick(customer, ["lastname", "last_name"]),
      ageRange: pick(custom, ["age_range", "agerange", "age"]),
      jobField: pick(custom, ["job_field", "jobfield", "job", "profession"]),
      region:
        pick(custom, ["region", "city", "canton"]) ||
        pick(customer, ["city"]),
      source: "infomaniak",
      event: eventLabel,
      newsletter,
    };
  }

  // Only valid tickets count: cancelled or refunded ones shouldn't be synced.
  const validTickets = tickets.filter((ticket) => {
    const status = pick(ticket, ["status"]).toLowerCase();
    return !status || status === "valid";
  });

  if (probe) {
    const sample = validTickets[0] ?? null;
    return NextResponse.json({
      probe: true,
      ticketCount: tickets.length,
      validTickets: validTickets.length,
      customerCount: customers.length,
      optionLabels: Object.fromEntries(optionLabels),
      ticketSample: sample,
      customerSample: customers[0] ?? null,
      mappedPreview: sample ? toRegistrant(sample) : null,
      elapsedMs: Date.now() - startedAt,
    });
  }

  // One entry per person, even if they bought several tickets.
  const registrants = new Map<string, EventRegistrant>();
  let skipped = 0;
  for (const ticket of validTickets) {
    const registrant = toRegistrant(ticket);
    if (!registrant) {
      skipped += 1;
      continue;
    }
    const key = registrant.email.toLowerCase();
    const existing = registrants.get(key);
    // Keep the richest record if the same person appears more than once.
    registrants.set(key, existing ? {...existing, ...registrant} : registrant);
  }

  const people = [...registrants.values()];
  let newsletterOptIns = 0;
  const failures: string[] = [];

  // Bounded concurrency: fast, but gentle on Brevo's rate limits.
  await mapLimit(people, 5, async (registrant) => {
    const listIds = [
      eventListId,
      ...(registrant.newsletter && newsletterListId ? [newsletterListId] : []),
    ];
    if (registrant.newsletter && newsletterListId) newsletterOptIns += 1;

    const result = await upsertEventContact(registrant, {
      apiKey: brevoKey,
      listIds,
    });
    if (!result.ok) failures.push(`${registrant.email}: ${result.message}`);
  });

  return NextResponse.json({
    ok: true,
    event: eventLabel,
    ticketsFetched: tickets.length,
    validTickets: validTickets.length,
    people: people.length,
    synced: people.length - failures.length,
    skipped,
    newsletterOptIns,
    failed: failures.length,
    ...(failures.length ? {failures: failures.slice(0, 10)} : {}),
    elapsedMs: Date.now() - startedAt,
  });
}
