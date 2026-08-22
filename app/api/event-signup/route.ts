import {NextResponse} from "next/server";

import {upsertEventContact} from "@/lib/brevo-contact";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Ingest an event registration into the Brevo "Event community" list (#4).
 *
 * Meant to be called server-to-server by an automation (Infomaniak webhook,
 * Make/Zapier scenario, or a manual script). Protected by a shared secret in
 * `BREVO_WEBHOOK_SECRET`, sent either as `Authorization: Bearer <secret>` or a
 * `?secret=` query param. If no automation is available, registrants can still
 * be CSV-imported into list #4 in the Brevo dashboard.
 *
 * Custom attributes it writes (create these in Brevo → Contacts → Settings →
 * Contact attributes): FIRST_NAME, SURNAME, AGE_RANGE, JOB_FIELD, REGION, SOURCE.
 */
export async function POST(request: Request) {
  const secret = process.env.BREVO_WEBHOOK_SECRET;
  const authHeader = request.headers.get("authorization") ?? "";
  const provided =
    authHeader.replace(/^Bearer\s+/i, "").trim() ||
    new URL(request.url).searchParams.get("secret") ||
    "";

  if (!secret || provided !== secret) {
    return NextResponse.json({message: "Unauthorized."}, {status: 401});
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({message: "Invalid request payload."}, {status: 400});
  }

  const str = (value: unknown): string =>
    typeof value === "string" ? value.trim() : "";

  const email = str(body.email);
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {message: "A valid email is required."},
      {status: 400},
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const parsedListId = Number(process.env.BREVO_EVENT_LIST_ID);
  const listId = Number.isFinite(parsedListId) ? parsedListId : null;

  if (!apiKey) {
    return NextResponse.json(
      {message: "Brevo is not configured yet.", configured: false},
      {status: 503},
    );
  }

  // Shared with the Infomaniak cron sync so both paths write identical
  // contacts (including the cumulative EVENTS_ATTENDED / EVENT_COUNT history).
  const result = await upsertEventContact(
    {
      email,
      firstName: str(body.firstName),
      surname: str(body.surname) || str(body.lastName),
      ageRange: str(body.ageRange),
      jobField: str(body.jobField),
      region: str(body.region) || str(body.city),
      source: str(body.source),
      event: str(body.event) || str(body.eventSlug) || str(body.eventName),
    },
    {apiKey, listId},
  );

  if (result.ok) {
    return NextResponse.json({ok: true});
  }

  return NextResponse.json({message: result.message}, {status: result.status});
}
