import type {Event as PopEvent} from "@/content/events";
import {siteConfig, siteUrl} from "@/lib/site";

/**
 * Injects a `<script type="application/ld+json">` tag with the provided
 * schema object. Safe on the server — serialised via JSON.stringify with
 * angle-bracket escaping to prevent early-close attacks on the surrounding
 * document.
 */
function LdScript({data}: {data: Record<string, unknown>}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // The payload is a fully-typed object we just serialized ourselves; no
      // untrusted input flows in here.
      dangerouslySetInnerHTML={{__html: json}}
    />
  );
}

/**
 * Organization schema — added once in the root layout so every page carries
 * the site-wide "who runs POP" record for search engines.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/pop_logo.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zurich",
      addressCountry: "CH",
    },
    sameAs: [
      "https://www.instagram.com/pop_impactlab/",
    ],
  };
  return <LdScript data={data} />;
}

/**
 * Event schema — added on individual event detail pages so upcoming events
 * become eligible for Google's Event rich result treatment (with date,
 * venue, ticketing status, etc.).
 */
export function EventSchema({event}: {event: PopEvent}) {
  const status =
    event.status === "past"
      ? "https://schema.org/EventScheduled"
      : event.isTentative
        ? "https://schema.org/EventPostponed"
        : "https://schema.org/EventScheduled";

  const attendanceMode = "https://schema.org/OfflineEventAttendanceMode";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    eventStatus: status,
    eventAttendanceMode: attendanceMode,
    startDate: event.startsAt ?? event.isoDate,
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: "CH",
      },
    },
    image: [`${siteUrl}${event.image.src}`],
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    url: `${siteUrl}/en/events/${event.slug}`,
  };

  if (event.registrationType !== "closed" && event.status === "upcoming") {
    data.offers = {
      "@type": "Offer",
      url:
        event.registrationUrl ??
        event.registrationEmbedUrl ??
        `${siteUrl}/en/events/${event.slug}`,
      price: "0",
      priceCurrency: "CHF",
      availability: event.isTentative
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    };
  }

  return <LdScript data={data} />;
}
