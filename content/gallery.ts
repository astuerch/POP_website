export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
}

// TODO: Swap these placeholder visuals for approved event photos from the Wix site or the POP archive.
export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Crowd conversations",
    caption:
      "Placeholder highlight showing POP’s open, discussion-led atmosphere.",
    src: "/gallery-conversation.svg",
    alt: "Placeholder image representing an engaged audience in conversation.",
  },
  {
    id: "gallery-2",
    title: "Researchers in the room",
    caption: "A visual stand-in for the researcher-meets-community format.",
    src: "/gallery-researchers.svg",
    alt: "Placeholder image representing researchers hosting an event.",
  },
  {
    id: "gallery-3",
    title: "Evening event energy",
    caption: "Placeholder image for a relaxed Zurich event setting.",
    src: "/gallery-evening.svg",
    alt: "Placeholder image representing an evening science event.",
  },
  {
    id: "gallery-4",
    title: "Curious questions",
    caption: "Future home for candid audience moments and Q&A snapshots.",
    src: "/gallery-questions.svg",
    alt: "Placeholder image representing curious audience questions.",
  },
  {
    id: "gallery-5",
    title: "Ideas at the table",
    caption:
      "Placeholder for the no-panel, no-podium table conversation format.",
    src: "/gallery-table.svg",
    alt: "Placeholder image representing a table discussion.",
  },
  {
    id: "gallery-6",
    title: "POP moments",
    caption:
      "Reserved for a future mix of gallery highlights and event recaps.",
    src: "/gallery-moments.svg",
    alt: "Placeholder image representing POP event moments.",
  },
];
