export type RegistrationType =
  "ticket-tailor-paid" | "ticket-tailor-free" | "external" | "closed";

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
  registrationUrl?: string;
  ticketTailorEventId?: string;
  priceLabel?: string;
  speakers: string[];
  image: {
    src: string;
    alt: string;
  };
}

// TODO: Replace these placeholder event entries with the final approved POP Impact Lab schedule and copy.
export const events: Event[] = [
  {
    slug: "social-media-how-it-changes-your-mind",
    title: "Social Media & How it changes your Mind",
    summary:
      "A bold, jargon-free evening unpacking how attention, emotions, and algorithms shape what we believe online.",
    description: [
      "Join POP Impact Lab in Zurich for a conversation-driven evening about the neuroscience and social dynamics of digital feeds. Expect researchers in the room, no panel, no podium, and plenty of time to ask your own questions.",
      "This Phase 1 build uses placeholder copy that reflects the intended tone of the future site. Swap in the owner-provided event narrative, speaker details, and registration links here later.",
    ],
    isoDate: "2026-09-17",
    dateLabel: "September 17, 2026 · 19:00",
    location: "Zurich, Switzerland",
    venue: "Neighbourhood café venue placeholder",
    city: "Zurich",
    status: "upcoming",
    registrationType: "ticket-tailor-free",
    registrationUrl: "https://www.tickettailor.com/",
    ticketTailorEventId: "social-media-placeholder-2026",
    priceLabel: "Free RSVP",
    speakers: ["Maria Dimitriu", "Guest researcher placeholder"],
    image: {
      src: "/gallery-social.svg",
      alt: "Placeholder artwork for a POP Impact Lab social media event in Zurich.",
    },
  },
  {
    slug: "microplastics-after-work-conversation",
    title: "Microplastics After Work Conversation",
    summary:
      "A previous POP gathering exploring how microplastics move through daily life, media narratives, and policy debates.",
    description: [
      "This placeholder past-event summary demonstrates how earlier events can stay visible as a growing archive. Use this section later for photos, partners, or takeaways from the real event.",
    ],
    isoDate: "2025-11-12",
    dateLabel: "November 12, 2025",
    location: "Zurich, Switzerland",
    venue: "Bar venue placeholder",
    city: "Zurich",
    status: "past",
    registrationType: "closed",
    speakers: ["Ale Stürchler", "Industry guest placeholder"],
    image: {
      src: "/gallery-microplastics.svg",
      alt: "Placeholder artwork representing a microplastics discussion.",
    },
  },
  {
    slug: "brain-hacks-in-everyday-life",
    title: "Brain Hacks in Everyday Life",
    summary:
      "A past evening on habits, attention, and what neuroscience can realistically say about changing behaviour.",
    description: [
      "This placeholder event keeps the page structure ready for a fuller POP archive with recap copy, gallery images, and future SEO updates.",
    ],
    isoDate: "2025-06-05",
    dateLabel: "June 5, 2025",
    location: "Zurich, Switzerland",
    venue: "Community café placeholder",
    city: "Zurich",
    status: "past",
    registrationType: "closed",
    speakers: ["Jess Simon", "Maria Dimitriu"],
    image: {
      src: "/gallery-brain.svg",
      alt: "Placeholder artwork representing a neuroscience themed event.",
    },
  },
];

export const upcomingEvents = events.filter(
  (event) => event.status === "upcoming",
);
export const pastEvents = events.filter((event) => event.status === "past");

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
