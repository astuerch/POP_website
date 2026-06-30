import Image from "next/image";

import type { GalleryItem } from "@/content/gallery";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.id}
          className="border-brand-ink/10 shadow-card overflow-hidden rounded-[1.75rem] border bg-white"
        >
          <div className="bg-brand-sand relative aspect-[4/3]">
            <Image
              fill
              className="object-cover"
              src={item.src}
              alt={item.alt}
            />
          </div>
          <figcaption className="space-y-2 p-5">
            <h3 className="text-brand-ink text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-brand-slate text-sm leading-7">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
