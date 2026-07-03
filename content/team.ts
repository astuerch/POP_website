export interface TeamMember {
  name: string;
  role: string;
  /** Short affiliation line shown under the role (e.g. "ETH & UZH"). */
  org?: string;
  bio: string;
  focus: string;
  image: {
    src: string;
    alt: string;
  };
  /** Tightly-cropped circular portrait used in the compact (circular) layout. */
  roundImage?: string;
}

export const team: TeamMember[] = [
  {
    name: "Maria Dimitriu",
    role: "Neuroscience PhD candidate",
    org: "ETH & UZH",
    bio: "Maria anchors POP's science-first credibility while keeping the tone human, interactive, and free of unnecessary jargon.",
    focus: "Turning emerging research into open, question-led discussions.",
    image: {
      src: "/images/team/pic-maria.png",
      alt: "Maria Dimitriu, Neuroscience PhD candidate, ETH & UZH",
    },
    roundImage: "/images/team/pic-maria-round.png",
  },
  {
    name: "Jess Simon",
    role: "Media & Networks",
    org: "ex-Forbes",
    bio: "Jess brings editorial and network-building experience that helps every POP event feel bold, clear, and easy to share.",
    focus: "Building bridges between research, storytelling, and public curiosity.",
    image: {
      src: "/images/team/pic-jess.png",
      alt: "Jess Simon, Media & Networks, ex-Forbes",
    },
    roundImage: "/images/team/pic-jess-round.png",
  },
  {
    name: "Ale Stürchler",
    role: "PhD in Biotechnology",
    org: "ETH",
    bio: "Ale helps shape POP's approachable format so scientific insight feels grounded, welcoming, and useful beyond the lab.",
    focus: "Translating complex science into conversations people want to join.",
    image: {
      src: "/images/team/pic-ale.png",
      alt: "Ale Stürchler, PhD in Biotechnology, ETH",
    },
    roundImage: "/images/team/pic-ale-round.png",
  },
];
