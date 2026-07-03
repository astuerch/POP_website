import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {SectionHeading} from "@/components/section-heading";

const cards = [
  {
    icon: "/images/icons/icon1-question.png",
    titleKey: "card1Title",
    bodyKey: "card1Body",
    alt: "Illustration representing a bold question.",
  },
  {
    icon: "/images/icons/icon2-scientist.png",
    titleKey: "card2Title",
    bodyKey: "card2Body",
    alt: "Illustration representing researchers in the room.",
  },
  {
    icon: "/images/icons/icon3-discussion.png",
    titleKey: "card3Title",
    bodyKey: "card3Body",
    alt: "Illustration representing an open conversation.",
  },
] as const;

export async function HowPopWorks() {
  const t = await getTranslations("howPopWorks");

  return (
    <AnimatedSection>
      <section className="space-y-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-8 lg:grid-cols-3">
          {cards.map((card, index) => (
            <AnimatedSection key={card.titleKey} delay={0.05 * (index + 1)}>
              <article className="group bg-brand-surface hover:border-brand-lila/60 relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(182,161,210,0.45)]">
                <div className="from-brand-lila/25 via-brand-lila/10 relative flex aspect-[16/11] items-center justify-center overflow-hidden bg-gradient-to-b to-transparent p-8">
                  <span
                    aria-hidden="true"
                    className="font-heading text-outline absolute -top-5 -left-2 text-8xl leading-none opacity-60 select-none"
                  >
                    {`0${index + 1}`}
                  </span>
                  {/* Icons were designed on light backgrounds (baked white
                      circles), so they sit inside a white circular badge on
                      the dark panel. */}
                  <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-white/95 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition duration-500 group-hover:scale-105 sm:h-32 sm:w-32">
                    <Image
                      src={card.icon}
                      alt={card.alt}
                      width={534}
                      height={534}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-brand-fog text-xl font-bold">
                    {t(card.titleKey)}
                  </h3>
                  <div className="bg-brand-lila mt-3 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-20" />
                  <p className="text-brand-mist mt-4 text-base leading-7">
                    {t(card.bodyKey)}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
