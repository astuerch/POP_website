import Image from "next/image";
import {getTranslations} from "next-intl/server";

import type {GalleryItem} from "@/content/gallery";
import {galleryItems} from "@/content/gallery";
import {Link} from "@/i18n/navigation";
import {Reveal} from "@/components/reveal";

// Manually curated preview: four hero shots for the homepage teaser. The
// fifth cell in the row is a "see full gallery" call-to-action tile.
// Filenames match the numeric ordering in `public/images/gallery/event-01/web/`.
const TEASER_FILES = ["6.jpg", "19.jpg", "20.jpg", "18.jpg"] as const;

/**
 * Home-page gallery strip: four hand-picked photos plus a CTA tile that links
 * to the full gallery — one row on desktop, 3-up on tablet, 2-up on mobile.
 */
export async function GalleryTeaser() {
  const t = await getTranslations("socialProof");

  const thumbs: GalleryItem[] = TEASER_FILES.map((file) =>
    galleryItems.find((item) => item.src.endsWith(`/${file}`)),
  ).filter((item): item is GalleryItem => item !== undefined);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {thumbs.map((item, index) => (
        <Link
          key={item.src}
          href="/gallery"
          className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
        >
          <Reveal className="absolute inset-0" delay={index * 0.08}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </Reveal>
        </Link>
      ))}
      <Link
        href="/gallery"
        className="text-brand-fog link-slide col-span-2 mt-1 flex items-center justify-center text-base font-semibold sm:col-span-1 sm:mt-0"
      >
        {t("galleryLink")}
      </Link>
    </div>
  );
}
