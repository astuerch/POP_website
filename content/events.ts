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
  /** Series edition number → rendered as "POP 01", "POP 02", … */
  edition?: number;
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
    edition: 2,
    title: "Social Media & How it changes your Mind",
    summary:
      "Two speakers. One question: what is social media actually doing to us? A researcher who studies the systems, and a strategist who builds inside them.",
    aboutHeading:
      "Two speakers. One question: what is social media actually doing to us?",
    description: [
      "Every feed you scroll has been shaped by decisions someone made. What surfaces. What disappears. What you never see at all. Those decisions are made by people, inside companies, using systems most of us never look at directly.",
      "For POP 02 we've brought together someone who studies those systems and someone who builds inside them. Stefania Ionescu researches how recommendation and moderation tools shape what a society sees. Sophia Kramer has spent a decade building communication for brands on exactly those platforms, and now builds AI tools for the people who do that work.",
      "Two vantage points on the same machinery, in the same room.",
    ],
    isoDate: "2026-10-26",
    // Doors 19:00, talks start 19:30 (CET, UTC+1 since DST ends 25 Oct 2026).
    // The countdown targets the talk start.
    startsAt: "2026-10-26T19:30:00+01:00",
    isTentative: false,
    dateLabel: "Mon, Oct 26, 2026 · Doors 19:00 · Talks 19:30",
    location: "Zürich, Switzerland",
    venue: "Amboss Rampe, Zürich",
    city: "Zürich",
    status: "upcoming",
    registrationType: "infomaniak-free",
    // Registration NOT open yet → the page keeps showing "opening soon".
    // To go live, set registrationUrl (button) or registrationEmbedUrl (inline widget).
    // Infomaniak group page (ready when registration opens):
    //   https://infomaniak.events/group/dd687bd7-ca77-463d-8fb9-a249751f4831
    //   (prefer a per-event Infomaniak link/embed for this single event if available.)
    priceLabel: "Free RSVP · Registration opening soon",
    speakers: ["Stefania Ionescu", "Sophia Kramer", "Mihai Barascu (DJ set)"],
    schedule: [
      {
        time: "19:00",
        title: "Welcome Apéro",
        details: ["Arrival, drinks and informal networking."],
      },
      {
        time: "19:30",
        title: "Talks",
        details: [
          "Who sees what: How social media design choices shape work, opinion, and culture — Stefania Ionescu",
          "Is social media making us anti-social? — Sophia Kramer",
          "20 minutes each, followed by Q&A with the room.",
        ],
      },
      {
        time: "From 20:30",
        title: "Open discussion, networking & DJ set",
        details: [
          "The floor opens up: questions, conversations and new connections.",
          "DJ Set by Mihai Barascu.",
        ],
      },
    ],
    lineup: [
      {
        // No label: these are the speakers, shown directly under the heading.
        title: "",
        people: [
          {
            name: "Stefania Ionescu",
            role: "Postdoctoral researcher, ETH Zurich",
            talkTitle:
              "Who sees what: How social media design choices shape work, opinion, and culture",
            bio: "Stefania studies what happens when algorithms decide what people see. Her research looks at recommendation, moderation and filtering tools, the invisible machinery behind every feed, and asks what they do to opinion, to work, and to culture. She started in mathematics at the University of Cambridge, then took a master's in Logic at the ILLC in Amsterdam, cum laude. Her PhD at the University of Zurich, on the societal impact of these systems, was awarded summa cum laude, and in 2025 she received the FAN Award for outstanding scientific achievement in Law and Economics. She is now a postdoctoral researcher at ETH Zurich working on responsible automation. Recently she worked with Bluesky feeds to test a deceptively simple question: change how posts are ranked, and how much does what people see change with it? She also co-designs university courses, Game Theory and Algorithmic Concepts and Social Computing, that put this research in front of the engineers who will build the next generation of these systems. Outside the lab: board games, Dungeons & Dragons, and hiking.",
            image: "/images/events/event-02/speaker-stefania.jpg",
          },
          {
            name: "Sophia Kramer",
            role: "CEO and co-founder, Smove AI",
            talkTitle: "Is social media making us anti-social?",
            bio: "Sophia has spent ten years on the other side of the feed. As a designer and strategist in agency and brand roles, she has built communication platforms for Audemars Piguet, FC Bayern, BMW, Burger King, Paulaner and Coop, work that reached millions of people through the platforms we'll be talking about. She trained as a designer and holds a BA in International Business Studies from FAU Erlangen-Nürnberg. She was named 30u30 Swiss Communication and is a Cannes Young Lion medalist. She now runs Smove AI, which builds AI agents for Swiss and German creative agencies, one each for Instagram, LinkedIn and Facebook, that draft social content and pass it to a human for approval before publishing. Ten years of building for these platforms, and a daily view of where they're heading next. Outside the work: she runs MAPO, an NGO supporting education for children in Tanzania, is a committed Rotarian, and plays chess and piano.",
            image: "/images/events/event-02/speaker-sophia.jpg",
          },
        ],
      },
      {
        title: "Live Music",
        people: [
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
      src: "/images/events/event2_pic.jpg",
      alt: "Artwork of a head opening into a colourful brain with hands placing social media logos.",
    },
  },
  {
    slug: "ai-vs-human-creativity",
    edition: 1,
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
      src: "/images/events/event1_pic.jpg",
      alt: "Guests gathered at a POP Impact Lab event in Zürich.",
    },
  },
];

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

/** Formats a series edition number as its POP code, e.g. 1 → "POP 01". */
export function popEditionLabel(edition: number): string {
  return `POP ${String(edition).padStart(2, "0")}`;
}
