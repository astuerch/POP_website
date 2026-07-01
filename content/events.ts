export type RegistrationType =
  | "ticket-tailor-paid"
  | "ticket-tailor-free"
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
  registrationUrl?: string;
  ticketTailorEventId?: string;
  priceLabel?: string;
  speakers: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const events: Event[] = [
  {
    slug: "next-event-september-2026",
    title: "Topic to be announced — be the first to know.",
    summary:
      "The next POP evening is taking shape now. Join the list to hear the question, the researchers, and the venue details first.",
    description: [
      "Our next event lands in September 2026 at Vergani, Löwenplatz, Zürich. The theme will be announced soon, but the format stays the same: a strong public question, researchers in the room, and a conversation that feels open from the first minute.",
      "Seats will be limited. Subscribe to the newsletter to get first access when the full programme goes live.",
    ],
    isoDate: "2026-09-01",
    dateLabel: "September 2026 · Evening event",
    location: "Zürich, Switzerland",
    venue: "Vergani, Löwenplatz, Zürich",
    city: "Zürich",
    status: "upcoming",
    registrationType: "ticket-tailor-free",
    ticketTailorEventId: "next-event-september-2026",
    priceLabel: "Limited seats",
    speakers: ["Maria Dimitriu", "Alessandra Stürchler"],
    image: {
      src: "/images/events/event1_pic.png",
      alt: "Guests gathered at a POP Impact Lab event in Zürich.",
    },
  },
  {
    slug: "social-media-how-it-changes-your-mind",
    title: "Social Media & How it changes your Mind",
    summary:
      "A past POP conversation exploring how platforms, attention and emotion shape what we believe online.",
    description: [
      "This edition brought a live audience into a shared conversation about digital habits, attention, and influence. Instead of a panel, POP kept the room open and question-led.",
      "This event is part of the growing POP archive and will later be expanded with a fuller recap.",
    ],
    isoDate: "2025-11-12",
    dateLabel: "Past POP edition",
    location: "Zürich, Switzerland",
    venue: "POP archive event",
    city: "Zürich",
    status: "past",
    registrationType: "closed",
    priceLabel: "Archive entry",
    speakers: ["Maria Dimitriu", "Jess Simon"],
    image: {
      src: "/images/events/event2_pic.png",
      alt: "Participants listening and speaking during a POP Impact Lab event.",
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
