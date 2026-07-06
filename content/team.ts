export interface TeamMember {
  name: string;
  /** Full name shown on the About page (falls back to `name`). */
  fullName?: string;
  role: string;
  /** Short affiliation line shown under the role (e.g. "ETH & UZH"). */
  org?: string;
  /** Evocative role/title shown on the About page bios. */
  title?: string;
  bio: string;
  /** Longer narrative bio shown on the About page. */
  longBio?: string;
  focus: string;
  image: {
    src: string;
    alt: string;
  };
  /** Tightly-cropped circular portrait used in the compact/detailed layouts. */
  roundImage?: string;
  /** Personal social links (About page). */
  linkedin?: string;
  instagram?: string;
}

export const team: TeamMember[] = [
  {
    name: "Maria Dimitriu",
    role: "Neuroscience PhD candidate",
    org: "ETH & UZH",
    title: "Science Translator & Cognitive Explorer",
    bio: "Maria anchors POP's science-first credibility while keeping the tone human, interactive, and free of unnecessary jargon.",
    longBio:
      "Maria is a PhD candidate in molecular neurobiology at ETH Zurich, where she studies the long-term effects of stress on the brain. She is passionate about connecting science with society through communication, outreach, and policy. She has organized and moderated scientific events for audiences ranging from specialists to the general public.",
    focus: "Turning emerging research into open, question-led discussions.",
    image: {
      src: "/images/team/pic-maria.png",
      alt: "Maria Dimitriu, Neuroscience PhD candidate, ETH & UZH",
    },
    roundImage: "/images/team/pic-maria-round.png",
    linkedin: "https://www.linkedin.com/in/mariadimitriu/",
  },
  {
    name: "Jess Simon",
    role: "Media & Networks",
    org: "ex-Forbes",
    title: "Network Architect & Media Strategist",
    bio: "Jess brings editorial and network-building experience that helps every POP event feel bold, clear, and easy to share.",
    longBio:
      "Jess builds networks at the intersection of media and culture, with experience managing communities of over 5,000 people. With a background at Forbes, she focuses on public-facing storytelling and has moderated events designed to spark collaboration beyond traditional institutional settings.",
    focus: "Building bridges between research, storytelling, and public curiosity.",
    image: {
      src: "/images/team/pic-jess.png",
      alt: "Jess Simon, Media & Networks, ex-Forbes",
    },
    roundImage: "/images/team/pic-jess-round.png",
    linkedin: "https://www.linkedin.com/in/jessica-simon-79a42498/",
    instagram: "https://www.instagram.com/jesssimon___/",
  },
  {
    name: "Ale Stürchler",
    fullName: "Alessandra Stürchler",
    role: "PhD in Biotechnology",
    org: "ETH",
    title: "Biotech Innovator & Impact Builder",
    bio: "Ale helps shape POP's approachable format so scientific insight feels grounded, welcoming, and useful beyond the lab.",
    longBio:
      "Alessandra holds a PhD from ETH Zurich, where she developed new non-invasive methods for early disease detection. She is a builder at heart, happiest in the space where research meets the real world. She loves joining the dots to turn scientific ideas into tools that have a direct impact on people's lives.",
    focus: "Translating complex science into conversations people want to join.",
    image: {
      src: "/images/team/pic-ale.png",
      alt: "Alessandra Stürchler, PhD in Biotechnology, ETH",
    },
    roundImage: "/images/team/pic-ale-round.png",
    linkedin: "https://www.linkedin.com/in/astuerch/",
  },
];
