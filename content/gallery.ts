export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "The room before the first question",
    caption:
      "A wide view of the POP atmosphere: informal, full, and ready for exchange.",
    src: "/images/hero/crowd_pop.jpg",
    alt: "Audience gathered at a POP Impact Lab event in Zürich.",
  },
  {
    id: "gallery-2",
    title: "Conversation over performance",
    caption:
      "POP formats are designed so researchers stay in the room and the discussion stays open.",
    src: "/images/events/event1_pic.png",
    alt: "People speaking together during a POP Impact Lab event.",
  },
  {
    id: "gallery-3",
    title: "Different perspectives, same table",
    caption:
      "The format makes room for lived experience, curiosity and scientific insight at the same time.",
    src: "/images/events/event2_pic.png",
    alt: "Participants listening during a POP Impact Lab event.",
  },
  {
    id: "gallery-4",
    title: "A Zürich evening with POP",
    caption:
      "Science enters the spaces people already go — and the room changes with it.",
    src: "/images/hero/crowd_pop.jpg",
    alt: "Another view of a POP Impact Lab audience in Zürich.",
  },
];
