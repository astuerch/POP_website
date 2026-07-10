/**
 * Press coverage — articles, interviews and mentions where POP Impact Lab has
 * been featured.
 *
 * HOW TO ADD A NEW ARTICLE
 * ------------------------
 * Copy the template below into the `pressArticles` array. `outlet`, `title`,
 * `date` and `url` are required; everything else is optional.
 *
 *   {
 *     outlet: "Tages-Anzeiger",              // publication name (shown if no logo)
 *     title: "Science leaves the lecture hall", // keep the headline as published
 *     date: "2026-05-14",                     // ISO date (YYYY-MM-DD) — used for sorting
 *     url: "https://example.com/article",     // link to the article
 *     excerpt: {                              // optional teaser, shown by site language
 *       en: "One or two sentences in English...",
 *       de: "Ein bis zwei Sätze auf Deutsch...",
 *     },
 *     logo: {                                 // optional outlet logo (put files in /public/images/press)
 *       src: "/images/press/example.svg",
 *       width: 200,
 *       height: 60,
 *     },
 *   }
 *
 * The page sorts newest-first and shows a friendly empty state while empty.
 */
export interface PressArticle {
  /** Name of the publication / outlet (shown when there is no logo). */
  outlet: string;
  /** Headline of the article — kept in the language it was published in. */
  title: string;
  /** ISO date (YYYY-MM-DD) the piece was published — used for sorting. */
  date: string;
  /** Link to the article. */
  url: string;
  /** Optional teaser shown on the card, in both site languages. */
  excerpt?: {en: string; de: string};
  /** Optional language of the article. */
  language?: "en" | "de";
  /** Optional outlet logo (files live in /public/images/press). */
  logo?: {src: string; width: number; height: number};
}

export const pressArticles: PressArticle[] = [
  {
    outlet: "Reach",
    title:
      "The New Intellectual Coolness: Where Science, Society and Creativity Finally Met",
    date: "2026-05-21",
    url: "https://www.reachmag.ch/post/the-new-intellectual-coolness-where-science-society-and-creativity-finally-met",
    excerpt: {
      en: "As official media partner at the first POP Impact Lab in Zürich — an evening where ETH research, live art and real conversations came together.",
      de: "Als offizieller Medienpartner beim ersten POP Impact Lab in Zürich — ein Abend, an dem ETH-Forschung, Live-Kunst und echte Gespräche aufeinandertrafen.",
    },
    language: "de",
    logo: {src: "/images/press/reach-logo.png", width: 805, height: 234},
  },
  {
    outlet: "m&k — Markt & Kommunikation",
    title: "POP Impact Lab: KI und Kreativität im Dialog",
    date: "2026-05-04",
    url: "https://www.markt-kom.com/de/kreativity/pop-impact-lab-ki-und-kreativitaet-im-dialog/",
    excerpt: {
      en: "Around 50 guests from science, business and the creative scene discussed how AI and creativity are reshaping the way we think, at the launch night in Zürich.",
      de: "Rund 50 Gäste aus Wissenschaft, Wirtschaft und Kreativszene diskutierten am Auftaktabend im Vergani Zürich, wie KI und Kreativität unser Denken verändern.",
    },
    language: "de",
    logo: {src: "/images/press/mk-logo.png", width: 1000, height: 440},
  },
];

/** Press articles sorted newest-first for display. */
export const sortedPressArticles = [...pressArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
