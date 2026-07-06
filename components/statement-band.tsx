import Image from "next/image";

import {Parallax} from "@/components/parallax";

/**
 * Full-bleed statement band. Sits between the boxed sections as a visual
 * "break" in the page: a photographic background drifts (parallax) while the
 * text scrolls over it, and top/bottom gradients dissolve it into the dark
 * page so the band feels like a distinct layer rather than more of the same.
 */
export function StatementBand({
  quote,
  kicker,
}: {
  quote: string;
  kicker?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Parallax className="absolute inset-0 scale-125" distance={60}>
        <Image
          fill
          aria-hidden
          alt=""
          src="/images/hero/crowd_pop.jpg"
          sizes="100vw"
          className="object-cover object-[50%_58%]"
        />
      </Parallax>
      <div className="from-brand-night via-brand-night/75 to-brand-night absolute inset-0 bg-gradient-to-b" />
      <div className="bg-brand-lila/10 absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-36">
        {kicker ? (
          <p className="text-brand-lila-light mb-6 text-sm font-semibold tracking-[0.28em] uppercase">
            {kicker}
          </p>
        ) : null}
        <p className="font-serif text-brand-fog text-3xl leading-tight text-pretty italic sm:text-5xl">
          “{quote}”
        </p>
      </div>
    </section>
  );
}
