import {NextResponse} from "next/server";

import {siteConfig} from "@/lib/site";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Minimal HTML escaping so user input can't inject markup into the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({message: "Invalid request payload."}, {status: 400});
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const name = [firstName, lastName].filter(Boolean).join(" ");

  if (!firstName || !message || !emailPattern.test(email)) {
    return NextResponse.json(
      {message: "Please provide your name, a valid email and a message."},
      {status: 400},
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;

  // Not configured yet: fail honestly (the form then tells the visitor to
  // email directly) rather than pretending the message was delivered. Go live
  // by setting BREVO_API_KEY and BREVO_SENDER_EMAIL (a sender validated in
  // Brevo) — no code change needed.
  if (!apiKey || !sender) {
    return NextResponse.json(
      {message: "Contact delivery is not configured yet.", configured: false},
      {status: 503},
    );
  }

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {email: sender, name: "POP Impact Lab website"},
        to: [{email: siteConfig.email, name: "POP Impact Lab"}],
        replyTo: {email, name: name || email},
        subject: `New contact message from ${name || email}`,
        htmlContent: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>`,
        textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
      cache: "no-store",
    });

    if (brevoResponse.ok || brevoResponse.status === 201) {
      return NextResponse.json({configured: true});
    }

    return NextResponse.json(
      {message: "Message could not be sent right now."},
      {status: 502},
    );
  } catch {
    return NextResponse.json(
      {message: "Message could not be sent right now."},
      {status: 502},
    );
  }
}
