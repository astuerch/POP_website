import Image from "next/image";

import type {GalleryItem} from "@/content/gallery";

/**
 * Masonry layout via CSS columns — preserves each photo's aspect ratio,
 * no cropping, no captions. Columns flow top-to-bottom, so the first item
 * in the list is always the top-left photo.
 */
export function GalleryGrid({items}: {items: GalleryItem[]}) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <div key={item.src} className="mb-4 break-inside-avoid">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="h-auto w-full rounded-xl"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
