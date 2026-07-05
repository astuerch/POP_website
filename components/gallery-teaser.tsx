import Image from "next/image";

import type {GalleryItem} from "@/content/gallery";
import {galleryItems} from "@/content/gallery";
import {Link} from "@/i18n/navigation";

// Manually curated preview: the five hero shots the owner wants to
// showcase on the homepage teaser. Filenames match the numeric ordering in
// `public/images/gallery/event-01/web/`.
const TEASER_FILES = ["6.jpg", "19.jpg", "20.jpg", "18.jpg", "49.png"] as const;

/**
 * Home-page gallery strip: five hand-picked photos in a single row on desktop
 * (masonry-style aspect-square tiles), 2-up on mobile. The section already
 * has a "See full gallery →" link above it, so no in-grid CTA tile is needed
 * here.
 */
export function GalleryTeaser() {
  const thumbs: GalleryItem[] = TEASER_FILES.map((file) =>
    galleryItems.find((item) => item.src.endsWith(`/${file}`)),
  ).filter((item): item is GalleryItem => item !== undefined);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
      {thumbs.map((item) => (
        <Link
          key={item.src}
          href="/gallery"
          className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
      ))}
    </div>
  );
}
