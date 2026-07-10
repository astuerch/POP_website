import {NextResponse} from "next/server";

import {siteConfig, siteUrl} from "@/lib/site";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

type Locale = "en" | "de";

/** Minimal HTML escaping for values interpolated into the email markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const welcomeCopy: Record<
  Locale,
  {
    subject: string;
    greeting: (name: string) => string;
    body: string[];
    cta: string;
    footer: string;
  }
> = {
  en: {
    subject: "Welcome to POP Impact Lab",
    greeting: (name) => `Welcome to POP${name ? `, ${name}` : ""}!`,
    body: [
      "Thanks for joining the POP Impact Lab newsletter. From now on, you'll be the first to hear about new events and get early access to the deeper context behind each topic. POP thrives on bridging the gap between research and society — so we'll be turning to you to help shape our next chapters and decide which questions matter most.",
      "We bring cutting-edge research from ETH Zurich and UZH into bars, cafés and public spaces. No jargon, no academic distance. Just real questions and room to think.",
      "See you in the room.",
    ],
    cta: "Explore upcoming events",
    footer:
      "You're receiving this because you signed up at popimpactlab.com. Changed your mind? Just reply to this email and we'll take you off the list.",
  },
  de: {
    subject: "Willkommen bei POP Impact Lab",
    greeting: (name) => `Willkommen bei POP${name ? `, ${name}` : ""}!`,
    body: [
      "Danke, dass du den Newsletter von POP Impact Lab abonniert hast. Ab jetzt erfährst du als Erste:r von neuen Events und erhältst frühzeitigen Zugang zum tieferen Kontext hinter jedem Thema. POP lebt davon, die Lücke zwischen Forschung und Gesellschaft zu schliessen — deshalb werden wir uns an dich wenden, um gemeinsam unsere nächsten Kapitel zu gestalten und zu entscheiden, welche Fragen am meisten zählen.",
      "Wir bringen Spitzenforschung der ETH Zürich und UZH in Bars, Cafés und öffentliche Räume. Kein Fachjargon, keine akademische Distanz. Nur echte Fragen und Raum zum Denken.",
      "Wir sehen uns im Gespräch.",
    ],
    cta: "Kommende Events entdecken",
    footer:
      "Du erhältst diese E-Mail, weil du dich auf popimpactlab.com angemeldet hast. Meinung geändert? Antworte einfach auf diese E-Mail und wir nehmen dich von der Liste.",
  },
};

function welcomeEmailHtml(firstName: string, locale: Locale): string {
  const copy = welcomeCopy[locale];
  const name = escapeHtml(firstName);
  const paragraphs = copy.body
    .map(
      (p) =>
        `<p style="margin:0 0 20px;color:#c9c3d6;font-size:15px;line-height:1.75;">${p}</p>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#0f0d16;">
    <div style="background:#0f0d16;padding:40px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#17141f;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
        <div style="padding:44px 40px 0;">
          <img src="${siteUrl}/images/brand/pop-logo-email.png" alt="POP Impact Lab" width="160" style="display:block;border:0;outline:none;text-decoration:none;height:auto;margin:0 0 9px;">
          <p style="margin:0;color:#a5a0b0;font-size:9px;letter-spacing:0.6px;text-transform:uppercase;">Where science meets society</p>
        </div>
        <div style="padding:40px 40px 4px;">
          <h1 style="margin:0 0 22px;color:#f4f1f9;font-size:23px;line-height:1.3;">${escapeHtml(copy.greeting(name))}</h1>
          ${paragraphs}
        </div>
        <div style="padding:16px 40px 44px;">
          <a href="${siteUrl}/${locale}/events" style="display:inline-block;background:#b6a1d2;color:#17141f;text-decoration:none;font-weight:bold;padding:14px 26px;border-radius:999px;font-size:14px;">${copy.cta} →</a>
        </div>
        <div style="padding:26px 40px;border-top:1px solid rgba(255,255,255,0.08);color:#7d7690;font-size:12px;line-height:1.7;">${copy.footer}</div>
      </div>
    </div>
  </body></html>`;
}

/**
 * Fires a Brevo transactional welcome email. Best-effort: any failure (or a
 * missing sender) is swallowed so it never blocks the subscription itself.
 */
async function sendWelcomeEmail(params: {
  email: string;
  firstName: string;
  locale: Locale;
  apiKey: string;
}): Promise<void> {
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!sender) return;

  const copy = welcomeCopy[params.locale];

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": params.apiKey,
      },
      body: JSON.stringify({
        sender: {name: "POP Impact Lab", email: sender},
        to: [
          {
            email: params.email,
            ...(params.firstName ? {name: params.firstName} : {}),
          },
        ],
        replyTo: {email: siteConfig.email, name: "POP Impact Lab"},
        subject: copy.subject,
        htmlContent: welcomeEmailHtml(params.firstName, params.locale),
      }),
      cache: "no-store",
    });
  } catch {
    // Ignore — the contact is already saved; the welcome email is a bonus.
  }
}

export async function POST(request: Request) {
  let body: {
    email?: string;
    firstName?: string;
    surname?: string;
    source?: string;
    locale?: string;
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
  const locale: Locale = body.locale === "de" ? "de" : "en";

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
      // Brevo returns 201 when a brand-new contact is created and 204 when an
      // existing one is updated. Only welcome genuinely new subscribers so we
      // never re-email people who sign up (or re-submit) more than once.
      if (brevoResponse.status === 201) {
        await sendWelcomeEmail({email, firstName, locale, apiKey});
      }

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
