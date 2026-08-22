/**
 * Shared Brevo contact upsert used by the event-signup webhook and the
 * Infomaniak cron sync, so both write contacts in exactly the same shape.
 *
 * Custom attributes must exist in Brevo (Contacts → Settings → Contact
 * attributes) — Text: FIRST_NAME, SURNAME, SOURCE, AGE_RANGE, JOB_FIELD,
 * REGION, EVENTS_ATTENDED. Number: EVENT_COUNT.
 */
export interface EventRegistrant {
  email: string;
  firstName?: string;
  surname?: string;
  ageRange?: string;
  jobField?: string;
  region?: string;
  source?: string;
  /** Event label stored in the cumulative history, e.g. "POP 02". */
  event?: string;
}

const BREVO = "https://api.brevo.com/v3";

/**
 * Reads the contact's current EVENTS_ATTENDED history. Brevo has no "append"
 * operation, so we read-modify-write. A missing contact yields no history.
 */
async function readAttendedHistory(
  email: string,
  apiKey: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `${BREVO}/contacts/${encodeURIComponent(email)}`,
      {
        headers: {accept: "application/json", "api-key": apiKey},
        cache: "no-store",
      },
    );
    if (!response.ok) return [];

    const contact = (await response.json()) as {
      attributes?: Record<string, unknown>;
    };
    const raw = contact.attributes?.EVENTS_ATTENDED;
    if (typeof raw !== "string" || !raw.trim()) return [];

    return raw
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export type UpsertResult =
  | {ok: true}
  | {ok: false; status: number; message: string};

/**
 * Creates or updates a Brevo contact, adds it to `listId`, and appends the
 * event to EVENTS_ATTENDED (deduped, case-insensitive) with EVENT_COUNT set to
 * the number of distinct events.
 */
export async function upsertEventContact(
  registrant: EventRegistrant,
  options: {apiKey: string; listId: number | null},
): Promise<UpsertResult> {
  const {apiKey, listId} = options;

  const attributes: Record<string, string | number> = {};
  const set = (key: string, value?: string) => {
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (trimmed) attributes[key] = trimmed;
  };

  set("FIRST_NAME", registrant.firstName);
  set("SURNAME", registrant.surname);
  set("AGE_RANGE", registrant.ageRange);
  set("JOB_FIELD", registrant.jobField);
  set("REGION", registrant.region);
  attributes.SOURCE = registrant.source?.trim() || "event";

  const event = registrant.event?.trim();
  if (event) {
    const attended = await readAttendedHistory(registrant.email, apiKey);
    if (!attended.some((entry) => entry.toLowerCase() === event.toLowerCase())) {
      attended.push(event);
    }
    attributes.EVENTS_ATTENDED = attended.join(", ");
    attributes.EVENT_COUNT = attended.length;
  }

  try {
    const response = await fetch(`${BREVO}/contacts`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: registrant.email,
        updateEnabled: true,
        attributes,
        ...(listId ? {listIds: [listId]} : {}),
      }),
      cache: "no-store",
    });

    if (response.ok || response.status === 204) return {ok: true};

    const payload = (await response.json().catch(() => null)) as
      | {code?: string; message?: string}
      | null;

    // An existing contact is a success for our purposes.
    if (
      payload?.code === "duplicate_parameter" ||
      payload?.message?.toLowerCase().includes("already")
    ) {
      return {ok: true};
    }

    return {
      ok: false,
      status: 502,
      message: payload?.message ?? "Brevo rejected the contact.",
    };
  } catch {
    return {ok: false, status: 502, message: "Could not reach Brevo."};
  }
}
