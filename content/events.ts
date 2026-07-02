export type RegistrationType =
  | "infomaniak-paid"
  | "infomaniak-free"
  | "external"
  | "closed";

export type EventStatus = "upcoming" | "past";

export interface Event {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  isoDate: string;
  dateLabel: string;
  location: string;
  venue: string;
  city: string;
  status: EventStatus;
  registrationType: RegistrationType;
  // Paste the future Infomaniak embed URL here to switch from placeholder to live registration.
  registrationEmbedUrl?: string;
  registrationUrl?: string;
  priceLabel?: string;
  speakers: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const events: Event[] = [
  {
    slug: "social-media-how-it-changes-your-mind",
    title: "Social Media & How it changes your Mind",
    summary:
      "Our next POP evening is in planning for September 2026 in Zürich. Join the newsletter to be first to know when RSVP opens.",
    description: [
      "This upcoming POP conversation explores how social platforms influence attention, mood, and decision-making in everyday life.",
      "Registration is not open yet. We will publish the Infomaniak RSVP link once the event page is live.",
    ],
    isoDate: "2026-09-01",
    dateLabel: "September 2026 · Exact day/time TBD",
    location: "Zürich, Switzerland",
    venue: "Venue to be confirmed",
    city: "Zürich",
    status: "upcoming",
    registrationType: "infomaniak-free",
    // Owner: paste the live Infomaniak embed URL in `registrationEmbedUrl` (or use `registrationUrl`) to go live.
    priceLabel: "Free RSVP · Registration opening soon",
    speakers: ["Speakers to be announced"],
    image: {
      src: "/images/events/event2_pic.png",
      alt: "Participants listening and speaking during a POP Impact Lab event.",
    },
  },
  {
    slug: "ai-vs-human-creativity",
    title: "AI vs. Human Creativity",
    summary:
      "POP's first event brought the Zürich community together to debate how artificial intelligence intersects with human creativity.",
    description: [
      "Hosted at Vergani, Löwenplatz, this first POP edition opened a public conversation on where machines can support creativity and where human perspective remains essential.",
      "This page is now part of the POP archive. A fuller recap with event photos and highlights will be added soon.",
    ],
    // Placeholder date until owner confirms the exact first-event date.
    isoDate: "2026-01-01",
    dateLabel: "Past POP edition · Exact date to be confirmed",
    location: "Zürich, Switzerland",
    venue: "Vergani, Löwenplatz, Zürich",
    city: "Zürich",
    status: "past",
    registrationType: "closed",
    priceLabel: "Archive recap",
    speakers: ["Speaker lineup to be confirmed"],
    image: {
      src: "/images/events/event1_pic.png",
      alt: "Guests gathered at a POP Impact Lab event in Zürich.",
    },
  },
  {
    slug: "microplastics-after-work-conversation",
    title: "Microplastics After Work Conversation",
    summary:
      "Placeholder archive entry for a future POP recap focused on microplastics, public understanding, and everyday choices.",
    description: [
      "This slug remains in place as a placeholder for a future past-event page. Replace this copy with the final recap when the approved content is ready.",
    ],
    isoDate: "2025-06-05",
    dateLabel: "Placeholder archive entry",
    location: "Zürich, Switzerland",
    venue: "Venue to be confirmed",
    city: "Zürich",
    status: "past",
    registrationType: "closed",
    priceLabel: "Placeholder",
    speakers: ["POP Impact Lab"],
    image: {
      src: "/gallery-microplastics.svg",
      alt: "Placeholder artwork representing a microplastics discussion.",
    },
  },
  {
    slug: "brain-hacks-in-everyday-life",
    title: "Brain Hacks in Everyday Life",
    summary:
      "Placeholder archive entry for a future POP recap on habits, attention, and what neuroscience can realistically offer daily life.",
    description: [
      "This slug remains in place as a placeholder for a future past-event page. Replace this copy with the final recap when the approved content is ready.",
    ],
    isoDate: "2025-03-20",
    dateLabel: "Placeholder archive entry",
    location: "Zürich, Switzerland",
    venue: "Venue to be confirmed",
    city: "Zürich",
    status: "past",
    registrationType: "closed",
    priceLabel: "Placeholder",
    speakers: ["POP Impact Lab"],
    image: {
      src: "/gallery-brain.svg",
      alt: "Placeholder artwork representing a neuroscience themed event.",
    },
  },
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
