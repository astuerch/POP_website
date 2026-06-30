import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    // TODO: Call the MailerLite API here when production credentials are available.
    // TODO: Use MAILERLITE_API_KEY for authorization and MAILERLITE_GROUP_ID to route subscribers.
    return NextResponse.json({
      message:
        apiKey && groupId
          ? "Thanks for joining the POP newsletter. MailerLite wiring is ready for the next phase."
          : "Newsletter signup stub received. Add MailerLite environment variables to enable the live integration.",
      configured: Boolean(apiKey && groupId),
      source: body.source ?? null,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }
}
