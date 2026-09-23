import {NextResponse} from "next/server";

import {upsertEventContact} from "@/lib/brevo-contact";

export const runtime = "nodejs";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Waiting-list sign-up for a sold-out event.
 *
 * These people join the same Brevo community list as ticket holders — they
 * wanted to come, so they're part of the community — but they are tagged
 * `SOURCE = waitlist` so you can filter exactly who to contact when a place
 * frees up. EVENTS_ATTENDED is deliberately NOT written: they haven't got a
 * place yet, and attendance figures stay honest for sponsors. If they later
 * buy a real ticket, the Infomaniak sync adds the event normally.
 */
export async function POST(request: Request) {
  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      {message: "Invalid request payload."},
      {status: 400},
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {message: "Please enter a valid email address."},
      {status: 400},
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {message: "Waiting list is not configured yet.", configured: false},
      {status: 503},
    );
  }

  const parsedList = Number(process.env.BREVO_EVENT_LIST_ID);
  const listId = Number.isFinite(parsedList) ? parsedList : null;

  const result = await upsertEventContact(
    {
      email,
      firstName: typeof body.firstName === "string" ? body.firstName.trim() : "",
      surname: typeof body.lastName === "string" ? body.lastName.trim() : "",
      source: "waitlist",
      // No `event`: a waiting-list place is not attendance.
    },
    {apiKey, listIds: listId ? [listId] : []},
  );

  if (result.ok) return NextResponse.json({ok: true});

  return NextResponse.json({message: result.message}, {status: result.status});
}
