export type RegistrationType =
  | "infomaniak-paid"
  | "infomaniak-free"
  | "external"
  | "closed";

export type EventStatus = "upcoming" | "past";

/** A single row in an event's run-of-show timeline. */
export interface EventScheduleItem {
  time: string;
  title: string;
  details?: string[];
}

/** A speaker or performer in an event line-up. */
export interface EventPerson {
  name: string;
  /** Their part in the evening, e.g. "Talk", "Live Painting", "Live DJ Set". */
  role: string;
  /** Talk title, when the person is giving a talk. */
  talkTitle?: string;
  bio: string;
  image: string;
}

/** A titled group of people, e.g. "Talks" or "Live Art & Music". */
export interface EventLineupGroup {
  title: string;
  people: EventPerson[];
}

export interface Event {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  isoDate: string;
  /**
   * Machine-readable start moment (ISO 8601 with Europe/Zurich offset),
   * used by the homepage/hero countdown. Optional — omit while the exact
   * start time is still TBD if no countdown should be shown.
   */
  startsAt?: string;
  /**
   * When true the date is provisional and no countdown should be shown to
   * visitors — the UI falls back to a "Save the date" placeholder chip and
   * hides the DD:HH:MM widget. Flip to false once the venue + start time
   * are locked in.
   */
  isTentative?: boolean;
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
  /** Optional evocative sub-heading shown above the About copy. */
  aboutHeading?: string;
  /** Optional richer hero/banner image (falls back to `image`). */
  heroImage?: {
    src: string;
    alt: string;
  };
  /** Optional run-of-show timeline. */
  schedule?: EventScheduleItem[];
  /** Optional grouped line-up with portraits and bios. */
  lineup?: EventLineupGroup[];
  /**
   * How the card/hero image is fitted. "contain" shows the whole image
   * (e.g. portrait artwork) over a blurred fill so nothing is cropped;
   * defaults to "cover".
   */
  imageFit?: "cover" | "contain";
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
    // Provisional 19:00 start on the provisional date (CEST, UTC+2) — update once confirmed.
    startsAt: "2026-09-01T19:00:00+02:00",
    isTentative: true,
    dateLabel: "September 2026 (TBD)",
    location: "Zürich, Switzerland",
    venue: "Venue to be confirmed",
    city: "Zürich",
    status: "upcoming",
    registrationType: "infomaniak-free",
    // Owner: paste the live registration embed URL in `registrationEmbedUrl` (or use `registrationUrl`) to go live.
    priceLabel: "Free RSVP · Registration opening soon",
    speakers: ["Speaker lineup to be announced"],
    imageFit: "contain",
    image: {
      src: "/images/events/event2_pic.png",
      alt: "Artwork of a head opening into a colourful brain with hands placing social media logos.",
    },
  },
  {
    slug: "ai-vs-human-creativity",
    title: "AI vs. Human Creativity",
    summary:
      "Can we touch a new way of being creative? As AI learns to paint, write, and compose, what defines human originality in the age of algorithms?",
    description: [
      "POP Impact Lab brought together researchers, artists and curious minds for an evening exploring the intersection of art, artificial intelligence and human creativity.",
      "The night began with a welcome apéro, creating space for conversation and connection. This was followed by two short talks that dived into the creative and philosophical questions surrounding generative AI and human creativity.",
      "After the talks, the evening opened into a more immersive experience where art and music unfolded live throughout the night. Artist Rhytm created a live painting, translating the themes of the discussion into visual form in real time. At the same time, Mihai Barascu took over the soundscape with a DJ set running through the evening, turning the space into a place where ideas continued through music, movement and conversation.",
      "From research to art, from discussion to dance, the evening invited everyone to reflect, create and connect.",
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
    aboutHeading:
      "When AI can generate it all, what's left for you to create?",
    heroImage: {
      src: "/images/events/event-01/hero.png",
      alt: "AI vs Human Creativity — POP Impact Lab event banner.",
    },
    schedule: [
      {
        time: "19:00",
        title: "Welcome Apéro",
        details: ["Arrival, food & drinks and informal networking."],
      },
      {
        time: "20:00",
        title: "Talks",
        details: [
          "Latent Dreams: Inside the Mind of a Generative Model — Mirlan Karimov",
          "Is Art Uniquely Human? — Zoe Caraiani",
        ],
      },
      {
        time: "From 20:50",
        title: "Live Art & Music",
        details: [
          "Live Painting by Rhytm",
          "DJ Set by Mihai Barascu",
          "Music, conversations and dancing throughout the evening.",
        ],
      },
    ],
    lineup: [
      {
        title: "Talks",
        people: [
          {
            name: "Mirlan Karimov",
            role: "Talk",
            talkTitle: "Latent Dreams: Inside the Mind of a Generative Model",
            bio: "Mirlan Karimov completed his Bachelor degree in Mechanical Engineering at the University of Budapest and his Master's in Computational Science at ETH Zurich. During an internship at Google Zurich, he worked on 3D reconstruction. Currently, he is working on generative models for video generation, developing world models for autonomous driving as part of his PhD at ETH Zurich and Mercedes-Benz. Outside of work, Mirlan produces electronic music.",
            image: "/images/events/event-01/speaker-mirlan.jpg",
          },
          {
            name: "Zoe Caraiani",
            role: "Talk",
            talkTitle: "Is Art Uniquely Human?",
            bio: "Zoe Caraiani completed her Bachelor in English and Russian language and literature and a Master's in philosophy of culture at the University of Bucharest, where her research explored how meaning is constructed across art forms. She works at the National Institute of Heritage and as an artistic consultant for historical landmark preservation in Romania, combining curatorial practice with cultural journalism. Outside of work, she is a dedicated concertgoer and close follower of the conversations happening across art forms.",
            image: "/images/events/event-01/speaker-zoe.jpg",
          },
        ],
      },
      {
        title: "Live Art & Music",
        people: [
          {
            name: "Rhytm",
            role: "Live Painting",
            bio: "Rhytm is a Zurich urban artist who doesn't just paint cities, but transforms their energy into art. Blending street culture, fine art, and fashion, his work is emotionally charged and deeply rooted in movement. From gallery contexts to brand collaborations, Rhytm has built a name that goes far beyond the canvas. For POP Impact Lab, he created a painting in real time that captured the electricity of the moment.",
            image: "/images/events/event-01/artist-rhytm.jpg",
          },
          {
            name: "Mihai Barascu",
            role: "Live DJ Set",
            bio: "Mihai has cultivated passions at the intersection of technology, arts, and humanities. With a background in mechanical engineering and finance, he is currently working as a chef while engaging in music exploration. Sharing an interest in various media, from electric guitars to digital instruments, his current electronic music attention has been focused on minimal house and techno.",
            image: "/images/events/event-01/artist-mihai.jpg",
          },
        ],
      },
    ],
    image: {
      src: "/images/events/event1_pic.png",
      alt: "Guests gathered at a POP Impact Lab event in Zürich.",
    },
  },
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
