"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import {Eyebrow} from "@/components/eyebrow";

const partners = [
  {src: "/images/brand/eth-logo.png", alt: "ETH Zürich logo", width: 180, height: 60},
  {src: "/images/brand/uzh-logo.jpg", alt: "UZH logo", width: 140, height: 60},
  {src: "/images/brand/lszy-logo.png", alt: "Life Science Zurich logo", width: 180, height: 60},
  {src: "/images/brand/reach-logo.png", alt: "Reach logo", width: 140, height: 60},
  {src: "/images/brand/vergani-logo.png", alt: "Vergani logo", width: 160, height: 60},
] as const;

export function PartnersStrip() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <Eyebrow className="text-center">{t("eyebrow")}</Eyebrow>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {/* Colored partner logos sit on light chips so they stay legible on the dark theme. */}
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="flex h-24 items-center justify-center rounded-2xl bg-white px-8"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
