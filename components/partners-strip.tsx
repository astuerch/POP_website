"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

// All originals are square 1:1 (1080×1080 or 1181×1181), so cells render at
// consistent visual weight and no single wordmark dominates the row.
const partners = [
  {src: "/images/brand/eth-logo.png", alt: "ETH Zürich logo", width: 1080, height: 1080},
  {src: "/images/brand/uzh-logo.jpg", alt: "UZH logo", width: 1080, height: 1080},
  {src: "/images/brand/lszy-logo.png", alt: "Life Science Zurich logo", width: 1181, height: 1181},
  {src: "/images/brand/reach-logo.png", alt: "Reach logo", width: 1080, height: 1080},
  {src: "/images/brand/vergani-logo.png", alt: "Vergani logo", width: 1080, height: 1080},
] as const;

export function PartnersStrip() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <h2 className="text-brand-fog text-center text-2xl font-semibold tracking-[0.4em] uppercase sm:text-3xl">
          {t("eyebrow")}
        </h2>
        {/* Original square-format logos: mix-blend-screen drops the (black) PNG
            backgrounds so the wordmarks read white on the dark surface. Cell
            is a fixed square so all five logos render at identical visual size. */}
        <div className="mt-10 grid grid-cols-3 items-center gap-x-4 gap-y-4 sm:mt-16 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="flex h-24 items-center justify-center sm:h-56"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                sizes="(max-width: 640px) 96px, 224px"
                className="h-full w-auto max-w-full object-contain opacity-90 mix-blend-screen"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
