import {NextResponse} from "next/server";

import {upsertEventContact, type EventRegistrant} from "@/lib/brevo-contact";

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
 * Env vars required:
 *   INFOMANIAK_TICKETING_API_KEY  — Ticketing → Store/Go Live → API Access
 *   INFOMANIAK_SHOP_ID            — numeric id of your ticketing shop
 *   BREVO_API_KEY, BREVO_EVENT_LIST_ID, BREVO_WEBHOOK_SECRET
 *   POP_EVENT_LABEL               — optional, defaults to "POP 02"
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

  // Custom registration questions usually arrive as an array of
  // {label/question/name, value/answer} pairs.
  const answerKeys = ["fields", "custom_fields", "answers", "form", "options"];
  for (const key of answerKeys) {
    const list = order[key];
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
  const shopId = process.env.INFOMANIAK_SHOP_ID;
  const brevoKey = process.env.BREVO_API_KEY;

  if (!apiKey || !shopId || !brevoKey) {
    return NextResponse.json(
      {
        message:
          "Missing config: INFOMANIAK_TICKETING_API_KEY, INFOMANIAK_SHOP_ID and BREVO_API_KEY are required.",
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

  const url = `${INFOMANIAK_BASE}/${encodeURIComponent(shopId)}/orders?limit=200&begin=${begin}`;

  let orders: Array<Record<string, unknown>>;
  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Infomaniak rejected the request.",
          status: response.status,
          hint: "Check INFOMANIAK_SHOP_ID and that the API key is valid.",
        },
        {status: 502},
      );
    }

    const payload = (await response.json()) as unknown;
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
    const sample = orders[0] ?? null;
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

  for (const order of orders) {
    const registrant = toRegistrant(order, eventLabel);
    if (!registrant) {
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
