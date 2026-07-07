import {NextResponse} from "next/server";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export async function POST(request: Request) {
  let body: {
    email?: string;
    firstName?: string;
    surname?: string;
    source?: string;
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

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const surname = typeof body.surname === "string" ? body.surname.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";

  const apiKey = process.env.BREVO_API_KEY;
  // Newsletter list (#3). Falls back to the legacy BREVO_LIST_ID if set.
  const listIdRaw = process.env.BREVO_NEWSLETTER_LIST_ID ?? process.env.BREVO_LIST_ID;
  const parsedListId = Number(listIdRaw);
  const listId = Number.isFinite(parsedListId) ? parsedListId : null;

  if (!apiKey) {
    return NextResponse.json({
      message:
        "Thanks for joining the POP newsletter. Brevo will be enabled once environment variables are configured.",
      configured: false,
      source: source || null,
    });
  }

  // Only send attributes we actually have. These custom attributes must exist
  // in Brevo (Contacts → Settings → Contact attributes): FIRST_NAME, SURNAME,
  // SOURCE — otherwise Brevo rejects the unknown fields.
  const attributes: Record<string, string> = {};
  if (firstName) attributes.FIRST_NAME = firstName;
  if (surname) attributes.SURNAME = surname;
  if (source) attributes.SOURCE = source;

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(Object.keys(attributes).length ? {attributes} : {}),
        ...(listId ? {listIds: [listId]} : {}),
      }),
      cache: "no-store",
    });

    if (brevoResponse.ok || brevoResponse.status === 204) {
      return NextResponse.json({
        message: "Thanks for joining the POP newsletter.",
        configured: true,
        source: source || null,
      });
    }

    const errorPayload = (await brevoResponse.json().catch(() => null)) as
      | {code?: string; message?: string}
      | null;

    if (
      errorPayload?.code === "duplicate_parameter" ||
      errorPayload?.message?.toLowerCase().includes("already")
    ) {
      return NextResponse.json({
        message: "Thanks for joining the POP newsletter.",
        configured: true,
        source: source || null,
      });
    }

    return NextResponse.json(
      {
        message:
          "Newsletter signup is temporarily unavailable. Please try again in a moment.",
      },
      {status: 502},
    );
  } catch {
    return NextResponse.json({
      message:
        "Thanks for your interest. We're finalizing newsletter delivery and will share updates soon.",
      configured: false,
      source: source || null,
    });
  }
}
