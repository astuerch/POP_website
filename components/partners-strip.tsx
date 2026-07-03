"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

const partners = [
  {src: "/images/brand/eth-logo-crop.png", alt: "ETH Zürich logo", width: 785, height: 146},
  {src: "/images/brand/uzh-logo-crop.png", alt: "UZH logo", width: 867, height: 310},
  {src: "/images/brand/lszy-logo-crop.png", alt: "Life Science Zurich logo", width: 1117, height: 355},
  {src: "/images/brand/reach-logo-crop.png", alt: "Reach logo", width: 823, height: 252},
  {src: "/images/brand/vergani-logo-crop.png", alt: "Vergani logo", width: 848, height: 520},
] as const;

export function PartnersStrip() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <h2 className="text-brand-fog text-center text-2xl font-semibold tracking-[0.4em] uppercase sm:text-3xl">
          {t("eyebrow")}
        </h2>
        {/* White-on-black logos: mix-blend-screen drops their black backgrounds
            so they read as clean white marks directly on the dark section. */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:mt-16 lg:justify-between lg:gap-x-8">
          {partners.map((partner) => (
            <Image
              key={partner.alt}
              src={partner.src}
              alt={partner.alt}
              width={partner.width}
              height={partner.height}
              className="h-9 w-auto object-contain opacity-90 mix-blend-screen sm:h-11"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
