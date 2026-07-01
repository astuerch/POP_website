export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  focus: string;
  image: {
    src: string;
    alt: string;
  };
}

export const team: TeamMember[] = [
  {
    name: "Maria Dimitriu",
    role: "Neuroscience PhD, ETH Zurich",
    bio: "Maria anchors POP's science-first credibility while keeping the tone human, interactive, and free of unnecessary jargon.",
    focus: "Turning emerging research into open, question-led discussions.",
    image: {
      src: "/images/team/pic maria.png",
      alt: "Maria Dimitriu, Neuroscience PhD, ETH Zurich",
    },
  },
  {
    name: "Jess Simon",
    role: "Media & Networks, ex-Forbes",
    bio: "Jess brings editorial and network-building experience that helps every POP event feel bold, clear, and easy to share.",
    focus: "Building bridges between research, storytelling, and public curiosity.",
    image: {
      src: "/images/team/pic jess.png",
      alt: "Jess Simon, Media & Networks, ex-Forbes",
    },
  },
  {
    name: "Alessandra Stürchler",
    role: "Biotech PhD, ETH Zurich",
    bio: "Ale helps shape POP's approachable format so scientific insight feels grounded, welcoming, and useful beyond the lab.",
    focus: "Translating complex science into conversations people want to join.",
    image: {
      src: "/images/team/pic ale.png",
      alt: "Alessandra Stürchler, Biotech PhD, ETH Zurich",
    },
  },
];
