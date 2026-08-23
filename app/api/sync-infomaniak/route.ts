import https from "node:https";
import {NextResponse} from "next/server";

import {upsertEventContact, type EventRegistrant} from "@/lib/brevo-contact";

// Must run on Node (not Edge): we use node:https to control raw headers.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Each order needs a detail lookup, so allow headroom for busy sync runs.
export const maxDuration = 60;

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

/**
 * Syncs Infomaniak ticketing orders into the Brevo event list (#4).
 *
 * Runs automatically via Vercel Cron (see vercel.json) — a free alternative to
 * a paid Zapier webhook plan. Can also be triggered manually:
 *
 *   GET /api/sync-infomaniak?secret=<BREVO_WEBHOOK_SECRET>
 *   GET /api/sync-infomaniak?secret=...&days=90     → widen the lookback window
 *   GET /api/sync-infomaniak?secret=...&probe=1     → dump the raw Infomaniak
 *                                                     payload shape without
 *                                                     writing anything to Brevo
 *
 * `probe=1` is the safe way to inspect the real field names the first time,
 * since Infomaniak's custom registration questions vary per ticketing setup.
 *
 * Auth (both headers are required — verified against the live API):
 *   `key`           = the ticketing shop API key, with "Ticket office access"
 *                     enabled on the key, and
 *   `Authorization` = an Infomaniak Manager API token, sent RAW (no "Bearer").
 *
 * Env vars required:
 *   INFOMANIAK_TICKETING_API_KEY    — Ticketing → Store/Go Live → API Access
 *   INFOMANIAK_TICKETING_CREDENTIAL — Manager → Profile → API tokens
 *   BREVO_API_KEY, BREVO_EVENT_LIST_ID, BREVO_WEBHOOK_SECRET
 *   POP_EVENT_LABEL                 — optional, defaults to "POP 02"
 */

const INFOMANIAK_BASE = "https://etickets.infomaniak.com/api/shop";

// Vercel Cron calls are authenticated by this header; manual calls use ?secret=.
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

/**
 * Flattens an order into a single lookup map (order fields + nested customer +
 * any custom question answers), so field matching works regardless of where
 * Infomaniak nests the value.
 */
function flatten(order: Record<string, unknown>): Record<string, unknown> {
  const flat: Record<string, unknown> = {...order};

  const nestedKeys = ["customer", "client", "buyer", "contact", "participant"];
  for (const key of nestedKeys) {
    const nested = order[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      Object.assign(flat, nested as Record<string, unknown>);
    }
  }

  // Custom registration questions arrive as arrays of {label, value} pairs,
  // either on the order itself or on each ticket.
  const answerKeys = ["fields", "custom_fields", "answers", "form", "options"];
  const absorbAnswers = (source: Record<string, unknown>) => {
    for (const key of answerKeys) {
      const list = source[key];
      if (!Array.isArray(list)) continue;
      for (const entry of list) {
        if (!entry || typeof entry !== "object") continue;
        const row = entry as Record<string, unknown>;
        const label = pick(row, ["label", "question", "name", "title", "key"]);
        const value = pick(row, ["value", "answer", "response", "content"]);
        if (label && value) {
          flat[label.toLowerCase().replace(/[^a-z0-9]+/g, "_")] = value;
        }
      }
    }
  };

  absorbAnswers(order);

  const tickets = order.tickets;
  if (Array.isArray(tickets)) {
    for (const ticket of tickets) {
      if (ticket && typeof ticket === "object") {
        absorbAnswers(ticket as Record<string, unknown>);
      }
    }
  }

  return flat;
}

function toRegistrant(
  order: Record<string, unknown>,
  eventLabel: string,
): EventRegistrant | null {
  const flat = flatten(order);

  const email = pick(flat, ["email", "mail", "email_address", "e_mail"]);
  if (!email.includes("@")) return null;

  return {
    email,
    firstName: pick(flat, ["firstname", "first_name", "firstName", "prenom", "vorname"]),
    surname: pick(flat, ["lastname", "last_name", "lastName", "surname", "nom", "nachname"]),
    ageRange: pick(flat, ["age_range", "agerange", "age", "tranche_d_age", "altersgruppe"]),
    jobField: pick(flat, ["job_field", "jobfield", "job", "profession", "industry", "branche", "domaine"]),
    region: pick(flat, ["region", "city", "ville", "stadt", "canton", "location", "wohnort"]),
    source: "infomaniak",
    event: eventLabel,
  };
}

export async function GET(request: Request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({message: "Unauthorized."}, {status: 401});
  }

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

  const params = new URL(request.url).searchParams;
  const probe = params.get("probe") === "1";
  const days = Math.min(Number(params.get("days")) || 30, 365);
  const eventLabel = params.get("event") || process.env.POP_EVENT_LABEL || "POP 02";

  const parsedList = Number(process.env.BREVO_EVENT_LIST_ID);
  const listId = Number.isFinite(parsedList) ? parsedList : null;

  // Only look at recent orders — re-syncing an existing contact is harmless
  // (Brevo upserts, and the event history dedupes), so a rolling window keeps
  // each run small and fast.
  const begin = new Date(Date.now() - days * 86_400_000)
    .toISOString()
    .slice(0, 10);

  // The shop is identified by the `key` credential, not by the path — the Shop
  // API routes carry no shop id (see etickets.infomaniak.com/docs/app).
  const baseQuery = `limit=200&begin=${begin}`;
  const ordersUrl = `${INFOMANIAK_BASE}/orders?${baseQuery}`;

  const credential = process.env.INFOMANIAK_TICKETING_CREDENTIAL;
  const baseHeaders: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": "en_GB",
    key: apiKey,
    ...(credential ? {Authorization: credential} : {}),
  };

  const diag = params.get("diag") === "1";

  /**
   * GET /orders returns a summary only (no email). The buyer's details live on
   * the order detail, so we expand each summary into its full record.
   */
  async function loadOrderDetail(
    summary: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const id = summary.order_id ?? summary.id;
    if (id === undefined || id === null) return summary;

    try {
      const detail = await rawGet(
        `${INFOMANIAK_BASE}/order/${encodeURIComponent(String(id))}`,
        baseHeaders,
      );
      if (detail.status < 200 || detail.status >= 300) return summary;

      const parsed = JSON.parse(detail.body) as unknown;
      const record =
        (parsed as {data?: unknown})?.data ??
        (parsed as {order?: unknown})?.order ??
        parsed;

      return record && typeof record === "object" && !Array.isArray(record)
        ? {...summary, ...(record as Record<string, unknown>)}
        : summary;
    } catch {
      return summary;
    }
  }

  let orders: Array<Record<string, unknown>>;
  try {
    const result = await rawGet(ordersUrl, baseHeaders);

    if (diag) {
      return NextResponse.json({
        diag: true,
        status: result.status,
        body: result.body.replace(/\s+/g, " ").slice(0, 400),
      });
    }

    if (result.status < 200 || result.status >= 300) {
      return NextResponse.json(
        {
          message: "Infomaniak rejected the request.",
          status: result.status,
          detail: result.body.slice(0, 400),
          keyLength: apiKey.length,
          hint: "Check the API key (Ticketing → Store/Go Live → API Access).",
        },
        {status: 502},
      );
    }

    const payload = JSON.parse(result.body) as unknown;
    const data =
      (payload as {data?: unknown})?.data ??
      (payload as {orders?: unknown})?.orders ??
      payload;
    orders = Array.isArray(data) ? (data as Array<Record<string, unknown>>) : [];
  } catch {
    return NextResponse.json(
      {message: "Could not reach Infomaniak."},
      {status: 502},
    );
  }

  // Inspect the real payload shape without touching Brevo.
  if (probe) {
    const summary = orders[0] ?? null;
    const sample = summary ? await loadOrderDetail(summary) : null;
    return NextResponse.json({
      probe: true,
      orderCount: orders.length,
      topLevelKeys: sample ? Object.keys(sample) : [],
      flattenedKeys: sample ? Object.keys(flatten(sample)) : [],
      mappedPreview: sample ? toRegistrant(sample, eventLabel) : null,
    });
  }

  let synced = 0;
  let skipped = 0;
  const failures: string[] = [];
  const seen = new Set<string>();

  for (const summary of orders) {
    const order = await loadOrderDetail(summary);
    const registrant = toRegistrant(order, eventLabel);
    if (!registrant) {
      // No usable email — e.g. box-office sales entered without customer data.
      skipped += 1;
      continue;
    }

    // One write per email per run, even if they bought several tickets.
    const key = registrant.email.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const result = await upsertEventContact(registrant, {
      apiKey: brevoKey,
      listId,
    });

    if (result.ok) synced += 1;
    else failures.push(`${registrant.email}: ${result.message}`);
  }

  return NextResponse.json({
    ok: true,
    event: eventLabel,
    ordersFetched: orders.length,
    synced,
    skipped,
    failed: failures.length,
    ...(failures.length ? {failures: failures.slice(0, 10)} : {}),
  });
}
