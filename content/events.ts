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
      "Where does influence end and manipulation begin? One speaker explores what social media does to the mind, another what it changes in society.",
    description: [
      "This POP evening in Zürich asks how social platforms shape attention, identity, and public discourse.",
      "The format combines research-based input with open discussion so participants can compare scientific evidence with lived experience.",
      "Registration details will be published once the event setup is finalized.",
    ],
    isoDate: "2026-09-01",
    dateLabel: "September 2026 (TBD)",
    location: "Zürich, Switzerland",
    venue: "Venue to be confirmed",
    city: "Zürich",
    status: "upcoming",
    registrationType: "infomaniak-free",
    // Owner: paste the live Infomaniak embed URL in `registrationEmbedUrl` (or use `registrationUrl`) to go live.
    priceLabel: "Free RSVP · Registration opening soon",
    speakers: ["Speaker lineup to be announced"],
    image: {
      src: "/images/events/event2_pic.png",
      alt: "Participants listening and speaking during a POP Impact Lab event.",
    },
  },
  {
    slug: "ai-vs-human-creativity",
    title: "AI vs. Human Creativity",
    summary:
      "Can we touch a new way of being creative? POP's first event explored what defines human originality in the age of generative AI.",
    description: [
      "Hosted at Vergani, Löwenplatz, this edition brought together researchers, artists, and curious minds to examine the intersection of art, artificial intelligence, and human creativity.",
      "After a welcome apero, the evening featured two talks: 'Latent Dreams: Inside the Mind of a Generative Model' and 'Is Art Uniquely Human?'.",
      "The discussion then continued through live painting by Rhytm and a DJ set by Mihai Barascu, turning the venue into a space for reflection, conversation, and movement.",
    ],
    isoDate: "2026-04-27",
    dateLabel: "Mon, Apr 27, 2026 · 19:00-22:30",
    location: "Zürich, Switzerland",
    venue: "Vergani, Löwenplatz, Zürich",
    city: "Zürich",
    status: "past",
    registrationType: "closed",
    priceLabel: "Archive recap",
    speakers: [
      "Mirlan Karimov",
      "Zoe Caraiani",
      "Rhytm (live painting)",
      "Mihai Barascu (DJ set)",
    ],
    image: {
      src: "/images/gallery/event-01/IMG_3658.JPG",
      alt: "Guests gathered at a POP Impact Lab event in Zürich.",
    },
  },
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
