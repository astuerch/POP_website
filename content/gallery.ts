export interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * A single POP Impact Lab edition's photo collection. The gallery page
 * renders one section per event with a sticky tab-bar for jumping between
 * them, so adding a second edition is just a matter of appending a new
 * object to `galleryEvents` below.
 */
export interface GalleryEventCollection {
  /** URL-safe slug — used as the anchor id for the sticky tab-bar. */
  id: string;
  title: string;
  dateLabel: string;
  venue?: string;
  description?: string;
  items: GalleryItem[];
}

// Photos from the first POP Impact Lab event (AI vs. Human Creativity, Vergani Zürich).
// Optimized web copies live in public/images/gallery/event-01/web/ (originals are kept untouched).
// Order (manually curated by the owner via file renames):
//   1. presentation slide (feature tile)
//   2. numbered event photos 1 → 49 in ascending order
//   3. personal-invitation flyer (closing tile)
// Widths/heights are the actual pixel dimensions of each web copy — they drive
// the masonry column layout, so keep them in sync if any photo is re-exported.
export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/event-01/web/presentation-slide.jpg",
    alt: "Presentation slide from the first POP Impact Lab event.",
    width: 1600,
    height: 901,
  },
  {
    src: "/images/gallery/event-01/web/1.jpg",
    alt: "Photo 1 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/2.jpg",
    alt: "Photo 2 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/3.jpg",
    alt: "Photo 3 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1537,
    height: 1023,
  },
  {
    src: "/images/gallery/event-01/web/4.jpg",
    alt: "Photo 4 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/5.jpg",
    alt: "Photo 5 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/6.jpg",
    alt: "Photo 6 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/7.jpg",
    alt: "Photo 7 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/8.jpg",
    alt: "Photo 8 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/9.jpg",
    alt: "Photo 9 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/10.jpg",
    alt: "Photo 10 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/11.jpg",
    alt: "Photo 11 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/12.jpg",
    alt: "Photo 12 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/13.jpg",
    alt: "Photo 13 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/14.jpg",
    alt: "Photo 14 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/15.jpg",
    alt: "Photo 15 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/16.jpg",
    alt: "Photo 16 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/17.jpg",
    alt: "Photo 17 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/18.jpg",
    alt: "Photo 18 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/19.jpg",
    alt: "Photo 19 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/20.jpg",
    alt: "Photo 20 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/21.jpg",
    alt: "Photo 21 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/22.jpg",
    alt: "Photo 22 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/23.jpg",
    alt: "Photo 23 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/24.jpg",
    alt: "Photo 24 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/25.jpg",
    alt: "Photo 25 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/26.jpg",
    alt: "Photo 26 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/27.jpg",
    alt: "Photo 27 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/gallery/event-01/web/28.jpg",
    alt: "Photo 28 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/event-01/web/29.jpg",
    alt: "Photo 29 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1402,
    height: 1122,
  },
  {
    src: "/images/gallery/event-01/web/30.jpg",
    alt: "Photo 30 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/gallery/event-01/web/31.jpg",
    alt: "Photo 31 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/gallery/event-01/web/32.jpg",
    alt: "Photo 32 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/33.jpg",
    alt: "Photo 33 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/34.jpg",
    alt: "Photo 34 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/35.jpg",
    alt: "Photo 35 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/36.jpg",
    alt: "Photo 36 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/37.jpg",
    alt: "Photo 37 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/38.jpg",
    alt: "Photo 38 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/39.jpeg",
    alt: "Photo 39 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/40.jpg",
    alt: "Photo 40 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/41.jpg",
    alt: "Photo 41 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1067,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/42.jpg",
    alt: "Photo 42 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/event-01/web/43.jpg",
    alt: "Photo 43 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1402,
    height: 1122,
  },
  {
    src: "/images/gallery/event-01/web/44.jpg",
    alt: "Photo 44 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/event-01/web/45.jpg",
    alt: "Photo 45 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1409,
    height: 939,
  },
  {
    src: "/images/gallery/event-01/web/46.jpg",
    alt: "Photo 46 of 51 from the first POP Impact Lab event in Zürich.",
    width: 901,
    height: 1600,
  },
  {
    src: "/images/gallery/event-01/web/47.jpg",
    alt: "Photo 47 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/event-01/web/48.jpg",
    alt: "Photo 48 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/event-01/web/49.jpg",
    alt: "Photo 49 of 51 from the first POP Impact Lab event in Zürich.",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/event-01/web/flyer_personal_invitations.jpg",
    alt: "Flyer with a personal invitation to the first POP Impact Lab event.",
    width: 1131,
    height: 1600,
  },
];

/**
 * Multi-event structure driving the gallery page. Add future editions here
 * by pushing a new `GalleryEventCollection` object. The gallery page reads
 * this list, renders one section per event, and generates the sticky tab-bar
 * automatically. The homepage teaser continues to read `galleryItems` (the
 * flattened list below), which stays in sync as new events are appended.
 */
export const galleryEvents: GalleryEventCollection[] = [
  {
    id: "ai-vs-human-creativity",
    title: "AI vs Human Creativity",
    dateLabel: "April 2026",
    venue: "Vergani, Zürich",
    description:
      "Our first edition — art, live painting, generative AI, and open conversation.",
    items: galleryItems,
  },
  // {
  //   id: "next-edition-slug",
  //   title: "Next event title",
  //   dateLabel: "September 2026",
  //   venue: "Venue, Zürich",
  //   description: "…",
  //   items: [...],
  // },
];
