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

  // Period custom fields arrive as an object keyed by the label you typed in
  // Infomaniak, e.g. {"Age Range": "tOption_2", "Job Field": "Biotech"}.
  const absorbCustomObject = (source: Record<string, unknown>) => {
    for (const key of ["custom_fields", "customFields", "custom"]) {
      const value = source[key];
      if (!value || typeof value !== "object" || Array.isArray(value)) continue;
      for (const [label, raw] of Object.entries(
        value as Record<string, unknown>,
      )) {
        if (typeof raw !== "string" && typeof raw !== "number") continue;
        const text = String(raw).trim();
        if (label && text) {
          flat[label.toLowerCase().replace(/[^a-z0-9]+/g, "_")] = text;
        }
      }
    }
  };

  absorbAnswers(order);
  absorbCustomObject(order);

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

  // Shape A: {"tOption_2": "25-34"}
  for (const [key, value] of entries) {
    if (/^tOption_\d+$/i.test(key) && typeof value === "string") {
      map.set(key, value);
    }
  }

  // Shape B: {id: "tOption_2", label: "25-34"}
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

function toRegistrant(
  order: Record<string, unknown>,
  eventLabel: string,
  optionLabels?: Map<string, string>,
): EventRegistrant | null {
  const flat = flatten(order);

  const email = pick(flat, ["email", "mail", "email_address", "e_mail"]);
  if (!email.includes("@")) return null;

  // Replace dropdown option ids with their human labels when we know them, and
  // fall back to the configured list order (tOption_1 = first option, …).
  const readable = (value: string): string => {
    if (!/^tOption_\d+$/i.test(value)) return value;
    const known = optionLabels?.get(value);
    if (known) return known;

    const fallback = (process.env.INFOMANIAK_AGE_RANGE_OPTIONS ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
    const index = Number(value.split("_")[1]) - 1;
    return fallback[index] ?? value;
  };

  return {
    email,
    firstName: pick(flat, ["firstname", "first_name", "firstName", "prenom", "vorname"]),
    surname: pick(flat, ["lastname", "last_name", "lastName", "surname", "nom", "nachname"]),
    ageRange: readable(
      pick(flat, ["age_range", "agerange", "age", "tranche_d_age", "altersgruppe"]),
    ),
    jobField: readable(
      pick(flat, ["job_field", "jobfield", "job", "profession", "industry", "branche", "domaine"]),
    ),
    region: readable(
      pick(flat, ["region", "city", "ville", "stadt", "canton", "location", "wohnort"]),
    ),
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

  /**
   * Custom registration answers (age range, job field, city…) are stored on the
   * tickets, not the order. Fetch them once and index by order id so each
   * registrant can be enriched without an extra call per order.
   */
  async function loadTicketAnswers(): Promise<{
    byOrder: Map<string, Record<string, unknown>>;
    sample: Record<string, unknown> | null;
  }> {
    const byOrder = new Map<string, Record<string, unknown>>();
    let sample: Record<string, unknown> | null = null;

    try {
      const response = await rawGet(
        `${INFOMANIAK_BASE}/tickets?limit=500&begin=${begin}`,
        baseHeaders,
      );
      if (response.status < 200 || response.status >= 300) {
        return {byOrder, sample};
      }

      const parsed = JSON.parse(response.body) as unknown;
      const data =
        (parsed as {data?: unknown})?.data ??
        (parsed as {tickets?: unknown})?.tickets ??
        parsed;
      const tickets = Array.isArray(data)
        ? (data as Array<Record<string, unknown>>)
        : [];

      if (tickets.length) sample = tickets[0];

      for (const ticket of tickets) {
        const orderId = pick(ticket, [
          "order_id",
          "orderId",
          "id_order",
          "order",
        ]);
        if (!orderId) continue;

        const flat = flatten(ticket);
        const existing = byOrder.get(orderId) ?? {};
        // Keep the first non-empty answer seen for this order.
        for (const [key, value] of Object.entries(flat)) {
          if (existing[key] === undefined && value !== null && value !== "") {
            existing[key] = value;
          }
        }
        byOrder.set(orderId, existing);
      }
    } catch {
      // Answers are a bonus — never fail the sync because of them.
    }

    return {byOrder, sample};
  }

  /**
   * Period-level custom fields (Age Range, Job Field, Region) live on the
   * customer record, so fetch the customer list once and index it by email.
   */
  async function loadCustomerRecords(): Promise<{
    byEmail: Map<string, Record<string, unknown>>;
    sample: Record<string, unknown> | null;
  }> {
    const byEmail = new Map<string, Record<string, unknown>>();
    let sample: Record<string, unknown> | null = null;

    try {
      const response = await rawGet(
        `${INFOMANIAK_BASE}/customers?limit=500`,
        baseHeaders,
      );
      if (response.status < 200 || response.status >= 300) {
        return {byEmail, sample};
      }

      const parsed = JSON.parse(response.body) as unknown;
      const data =
        (parsed as {data?: unknown})?.data ??
        (parsed as {customers?: unknown})?.customers ??
        parsed;
      const customers = Array.isArray(data)
        ? (data as Array<Record<string, unknown>>)
        : [];

      if (customers.length) sample = customers[0];

      for (const customer of customers) {
        const email = pick(customer, ["email", "mail"]).toLowerCase();
        if (email) byEmail.set(email, customer);
      }
    } catch {
      // Custom fields are a bonus — never fail the sync because of them.
    }

    return {byEmail, sample};
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

  const {byOrder: ticketAnswers, sample: ticketSample} =
    await loadTicketAnswers();
  const {byEmail: customerRecords, sample: customerSample} =
    await loadCustomerRecords();

  // The registration form definition holds the dropdown option labels.
  let formDefinition: unknown = null;
  const optionLabels = new Map<string, string>();
  try {
    const response = await rawGet(
      `${INFOMANIAK_BASE}/customers/form`,
      baseHeaders,
    );
    if (response.status >= 200 && response.status < 300) {
      formDefinition = JSON.parse(response.body) as unknown;
      collectOptionLabels(formDefinition, optionLabels);
    }
  } catch {
    // Option labels are cosmetic — fall back to the configured list order.
  }

  /**
   * Order detail + that order's ticket answers + the buyer's customer record
   * (which carries the period custom fields), ready for mapping.
   */
  function withAnswers(order: Record<string, unknown>) {
    const orderId = pick(order, ["order_id", "id"]);
    const answers = orderId ? ticketAnswers.get(orderId) : undefined;
    const merged: Record<string, unknown> = answers
      ? {...answers, ...order}
      : {...order};

    const email = pick(flatten(merged), ["email", "mail"]).toLowerCase();
    const customer = email ? customerRecords.get(email) : undefined;
    // Customer fields fill gaps without overwriting the order's own values.
    return customer ? {...flatten(customer), ...merged} : merged;
  }

  // Inspect the real payload shape without touching Brevo.
  if (probe) {
    const summary = orders[0] ?? null;
    const detail = summary ? await loadOrderDetail(summary) : null;
    const sample = detail ? withAnswers(detail) : null;

    // The list endpoints omit per-ticket form answers, so pull one full ticket
    // record to discover where the custom questions are stored.
    let ticketDetail: unknown = null;
    const ticketId = ticketSample ? pick(ticketSample, ["ticket_id", "id"]) : "";
    if (ticketId) {
      try {
        const response = await rawGet(
          `${INFOMANIAK_BASE}/ticket/${encodeURIComponent(ticketId)}`,
          baseHeaders,
        );
        ticketDetail =
          response.status >= 200 && response.status < 300
            ? (JSON.parse(response.body) as unknown)
            : {status: response.status, body: response.body.slice(0, 200)};
      } catch {
        ticketDetail = null;
      }
    }

    return NextResponse.json({
      probe: true,
      orderCount: orders.length,
      flattenedKeys: sample ? Object.keys(flatten(sample)) : [],
      // Where the period custom fields (Age Range, Job Field, Region) should be.
      customerSample: customerSample ?? null,
      formDefinition,
      optionLabels: Object.fromEntries(optionLabels),
      ticketDetail,
      mappedPreview: sample ? toRegistrant(sample, eventLabel, optionLabels) : null,
    });
  }

  let synced = 0;
  let skipped = 0;
  const failures: string[] = [];
  const seen = new Set<string>();

  for (const summary of orders) {
    const order = withAnswers(await loadOrderDetail(summary));
    const registrant = toRegistrant(order, eventLabel, optionLabels);
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
