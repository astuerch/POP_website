import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {galleryItems} from "@/content/gallery";
import {Link} from "@/i18n/navigation";

/**
 * Home-page gallery strip: four square photo thumbs plus a "+n more" tile
 * linking to the full gallery. Skips the first gallery item (presentation
 * slide) so the teaser shows actual event photos.
 */
export async function GalleryTeaser() {
  const t = await getTranslations("gallery");

  const thumbs = galleryItems.slice(1, 5);
  const remaining = galleryItems.length - thumbs.length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
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
            sizes="(max-width:640px) 50vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
      ))}
      <Link
        href="/gallery"
        className="bg-brand-surface hover:border-brand-lila/50 group col-span-2 flex aspect-square items-center justify-center rounded-xl border border-white/10 transition duration-300 sm:col-span-1"
      >
        <span className="font-heading text-brand-fog text-2xl uppercase">
          {t("morePhotos", {count: remaining})}{" "}
          <span
            aria-hidden="true"
            className="text-brand-lila inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </div>
  );
}
