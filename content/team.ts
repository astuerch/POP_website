import type {AppLocale} from "@/i18n/routing";

/**
 * A string that exists in both site languages. Plain strings are still allowed
 * for anything that reads the same in EN and DE (names, "ETH & UZH", …), so
 * only the fields that actually need a translation carry both versions.
 */
export type Localized = string | {en: string; de: string};

/** Resolves a Localized value for the active locale. */
export function localized(
  value: Localized | undefined,
  locale: AppLocale,
): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "string" ? value : value[locale];
}

export interface TeamMember {
  name: string;
  /** Full name shown on the About page (falls back to `name`). */
  fullName?: string;
  role: Localized;
  /** Short affiliation line shown under the role (e.g. "ETH & UZH"). */
  org?: Localized;
  /** Evocative role/title shown on the About page bios. */
  title?: Localized;
  bio: Localized;
  /** Longer narrative bio shown on the About page. */
  longBio?: Localized;
  focus: Localized;
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
    role: {
      en: "Neuroscience PhD candidate",
      de: "Doktorandin in Neurowissenschaften",
    },
    org: "ETH & UZH",
    title: {
      en: "Science Translator & Cognitive Explorer",
      de: "Wissenschaftsvermittlerin & kognitive Entdeckerin",
    },
    bio: {
      en: "Maria anchors POP's science-first credibility while keeping the tone human, interactive, and free of unnecessary jargon.",
      de: "Maria sorgt für die wissenschaftliche Glaubwürdigkeit von POP und hält den Ton dabei menschlich, interaktiv und frei von unnötigem Fachjargon.",
    },
    longBio: {
      en: "Maria is a PhD candidate in molecular neurobiology at ETH Zurich, where she studies the long-term effects of stress on the brain. She is passionate about connecting science with society through communication, outreach, and policy. She has organized and moderated scientific events for audiences ranging from specialists to the general public.",
      de: "Maria ist Doktorandin in molekularer Neurobiologie an der ETH Zürich und erforscht die langfristigen Auswirkungen von Stress auf das Gehirn. Sie setzt sich mit Leidenschaft dafür ein, Wissenschaft und Gesellschaft über Kommunikation, Outreach und Politik zu verbinden. Sie hat wissenschaftliche Veranstaltungen für Zielgruppen von Fachleuten bis zur breiten Öffentlichkeit organisiert und moderiert.",
    },
    focus: {
      en: "Turning emerging research into open, question-led discussions.",
      de: "Aktuelle Forschung in offene, fragengeleitete Gespräche übersetzen.",
    },
    image: {
      src: "/images/team/pic-maria.png",
      alt: "Maria Dimitriu, Neuroscience PhD candidate, ETH & UZH",
    },
    roundImage: "/images/team/pic-maria-round.png",
    linkedin: "https://www.linkedin.com/in/mariadimitriu/",
  },
  {
    name: "Jess Simon",
    role: {
      en: "Community Architect &",
      de: "Community-Architektin &",
    },
    org: {
      en: "Media Strategist",
      de: "Medienstrategin",
    },
    title: {
      en: "Community Architect & Media Strategist",
      de: "Community-Architektin & Medienstrategin",
    },
    bio: {
      en: "Jess brings editorial and network-building experience that helps every POP event feel bold, clear, and easy to share.",
      de: "Jess bringt redaktionelle Erfahrung und Netzwerkdenken mit, damit jedes POP-Event mutig, klar und leicht teilbar wird.",
    },
    longBio: {
      en: "Jess builds networks at the intersection of media and culture, with experience managing communities of over 5,000 people. With a background at Forbes, she focuses on public-facing storytelling and has moderated events designed to spark collaboration beyond traditional institutional settings.",
      de: "Jess baut Netzwerke an der Schnittstelle von Medien und Kultur auf und hat Communities mit über 5'000 Mitgliedern betreut. Mit einem Hintergrund bei Forbes konzentriert sie sich auf Storytelling für ein breites Publikum und moderiert Veranstaltungen, die Zusammenarbeit über klassische institutionelle Strukturen hinaus anstossen.",
    },
    focus: {
      en: "Building bridges between research, storytelling, and public curiosity.",
      de: "Brücken bauen zwischen Forschung, Storytelling und öffentlicher Neugier.",
    },
    image: {
      src: "/images/team/pic-jess.png",
      alt: "Jess Simon, Community Architect & Media Strategist",
    },
    roundImage: "/images/team/pic-jess-round.png",
    linkedin: "https://www.linkedin.com/in/jessica-simon-79a42498/",
    instagram: "https://www.instagram.com/jesssimon___/",
  },
  {
    name: "Ale Stürchler",
    fullName: "Alessandra Stürchler",
    role: {
      en: "PhD in Biotechnology",
      de: "PhD in Biotechnologie",
    },
    org: "ETH",
    title: {
      en: "Biotech Innovator & Impact Builder",
      de: "Biotech-Innovatorin & Impact-Gestalterin",
    },
    bio: {
      en: "Ale helps shape POP's approachable format so scientific insight feels grounded, welcoming, and useful beyond the lab.",
      de: "Ale prägt das zugängliche Format von POP, damit wissenschaftliche Erkenntnisse geerdet, einladend und auch ausserhalb des Labors nützlich bleiben.",
    },
    longBio: {
      en: "Alessandra holds a PhD from ETH Zurich, where she developed new non-invasive methods for early disease detection. She is a builder at heart, happiest in the space where research meets the real world. She loves joining the dots to turn scientific ideas into tools that have a direct impact on people's lives.",
      de: "Alessandra hat an der ETH Zürich promoviert, wo sie neue nicht-invasive Methoden zur Früherkennung von Krankheiten entwickelt hat. Sie ist Macherin aus Überzeugung und am liebsten dort unterwegs, wo Forschung auf die reale Welt trifft. Sie liebt es, Zusammenhänge zu verbinden und wissenschaftliche Ideen in Werkzeuge zu verwandeln, die das Leben von Menschen direkt verbessern.",
    },
    focus: {
      en: "Translating complex science into conversations people want to join.",
      de: "Komplexe Wissenschaft in Gespräche übersetzen, bei denen man mitreden will.",
    },
    image: {
      src: "/images/team/pic-ale.png",
      alt: "Alessandra Stürchler, PhD in Biotechnology, ETH",
    },
    roundImage: "/images/team/pic-ale-round.png",
    linkedin: "https://www.linkedin.com/in/astuerch/",
  },
];
