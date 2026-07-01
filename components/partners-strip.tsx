"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

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
    <section className="border-y border-brand-ink/10 bg-white/80">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <p className="text-brand-coral text-center text-sm font-semibold tracking-[0.24em] uppercase">
          {t("eyebrow")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="flex h-14 items-center justify-center grayscale transition hover:grayscale-0"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
          <span className="rounded-full border border-brand-ink/10 px-4 py-2 text-sm font-medium text-brand-slate">
            Suncademy
          </span>
          <span className="rounded-full border border-brand-ink/10 px-4 py-2 text-sm font-medium text-brand-slate">
            Avantcha
          </span>
        </div>
      </div>
    </section>
  );
}
