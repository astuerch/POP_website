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

// TODO: Replace these placeholder bios and images with approved founder materials.
export const team: TeamMember[] = [
  {
    name: "Ale Stürchler",
    role: "PhD in Biotechnology, ETH Zurich",
    focus:
      "Translating complex science into conversations people want to join.",
    bio: "Ale helps shape POP’s approachable format so scientific insight feels grounded, welcoming, and useful beyond the lab.",
    image: {
      src: "/team-ale.svg",
      alt: "Placeholder portrait for Ale Stürchler.",
    },
  },
  {
    name: "Jess Simon",
    role: "Media & Networks, ex-Forbes",
    focus:
      "Building bridges between research, storytelling, and public curiosity.",
    bio: "Jess brings editorial and network-building experience that helps every POP event feel bold, clear, and easy to share.",
    image: {
      src: "/team-jess.svg",
      alt: "Placeholder portrait for Jess Simon.",
    },
  },
  {
    name: "Maria Dimitriu",
    role: "Neuroscience PhD candidate, ETH & UZH",
    focus: "Turning emerging research into open, question-led discussions.",
    bio: "Maria anchors POP’s science-first credibility while keeping the tone human, interactive, and free of unnecessary jargon.",
    image: {
      src: "/team-maria.svg",
      alt: "Placeholder portrait for Maria Dimitriu.",
    },
  },
];
