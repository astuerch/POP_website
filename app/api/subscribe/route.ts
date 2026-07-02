import { NextResponse } from "next/server";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export async function POST(request: Request) {
  let body: { email?: string; source?: string };

  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;
  const parsedListId = Number(listIdRaw);
  const listId = Number.isFinite(parsedListId) ? parsedListId : null;

  if (!apiKey) {
    return NextResponse.json({
      message:
        "Thanks for joining the POP newsletter. Brevo will be enabled once environment variables are configured.",
      configured: false,
      source: body.source ?? null,
    });
  }

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
        ...(listId ? { listIds: [listId] } : {}),
      }),
      cache: "no-store",
    });

    if (brevoResponse.ok || brevoResponse.status === 204) {
      return NextResponse.json({
        message: "Thanks for joining the POP newsletter.",
        configured: true,
        source: body.source ?? null,
      });
    }

    const errorPayload = (await brevoResponse.json().catch(() => null)) as
      | { code?: string; message?: string }
      | null;

    if (
      errorPayload?.code === "duplicate_parameter" ||
      errorPayload?.message?.toLowerCase().includes("already")
    ) {
      return NextResponse.json({
        message: "Thanks for joining the POP newsletter.",
        configured: true,
        source: body.source ?? null,
      });
    }

    return NextResponse.json(
      {
        message:
          "Newsletter signup is temporarily unavailable. Please try again in a moment.",
      },
      { status: 502 },
    );
  } catch {
    return NextResponse.json({
      message:
        "Thanks for your interest. We're finalizing newsletter delivery and will share updates soon.",
      configured: true,
      source: body.source ?? null,
    });
  }
}
