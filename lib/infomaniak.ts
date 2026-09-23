import https from "node:https";

/**
 * Shared Infomaniak ticketing helpers.
 *
 * Auth needs BOTH credentials (verified against the live API):
 *   `key`           = shop API key with "Ticket office access", and
 *   `Authorization` = a Manager API token, sent RAW (no "Bearer" prefix).
 */
export const INFOMANIAK_BASE = "https://etickets.infomaniak.com/api/shop";

/**
 * Infomaniak requires a non-standard `key` header. Platform `fetch`
 * implementations normalise/drop it, so we use Node's raw HTTP client, which
 * sends header names exactly as written.
 */
export function rawGet(
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

export function infomaniakHeaders(): Record<string, string> | null {
  const apiKey = process.env.INFOMANIAK_TICKETING_API_KEY;
  if (!apiKey) return null;
  const credential = process.env.INFOMANIAK_TICKETING_CREDENTIAL;
  return {
    Accept: "application/json",
    "Accept-Language": "en_GB",
    key: apiKey,
    ...(credential ? {Authorization: credential} : {}),
  };
}

/** Parses a JSON list response that may be wrapped in {data:[…]}. */
export function toArray(
  body: string,
  ...keys: string[]
): Array<Record<string, unknown>> {
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

const text = (value: unknown) =>
  typeof value === "string" ? value : typeof value === "number" ? String(value) : "";

/**
 * Counts valid tickets sold for the selling event. Cancelled and refunded
 * tickets don't count, so freeing a place immediately reopens registration.
 *
 * Waiting-list tickets (if any exist in Infomaniak) are excluded so they never
 * inflate the count.
 */
export async function countSoldTickets(
  infomaniakEventId?: string,
): Promise<number | null> {
  const headers = infomaniakHeaders();
  if (!headers) return null;

  const eventId = (infomaniakEventId ?? "").trim();
  const waitlistMatch = (
    process.env.INFOMANIAK_WAITLIST_MATCH ?? "wait"
  ).toLowerCase();

  const begin = new Date(Date.now() - 365 * 86_400_000).toISOString().slice(0, 10);

  try {
    const response = await rawGet(
      `${INFOMANIAK_BASE}/tickets?limit=500&begin=${begin}`,
      headers,
    );
    if (response.status < 200 || response.status >= 300) return null;

    const tickets = toArray(response.body, "data", "tickets");
    return tickets.filter((ticket) => {
      const status = text(ticket.status).toLowerCase();
      if (status && status !== "valid") return false;

      const labels =
        `${text(ticket.event_name)} ${text(ticket.category_name)}`.toLowerCase();
      if (waitlistMatch && labels.includes(waitlistMatch)) return false;

      if (eventId && text(ticket.event_id) !== eventId) return false;
      return true;
    }).length;
  } catch {
    return null;
  }
}
