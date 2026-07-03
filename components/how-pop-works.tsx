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
      <section className="space-y-10">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => (
            <AnimatedSection key={card.titleKey} delay={0.05 * (index + 1)}>
              <article className="bg-brand-surface flex h-full flex-col rounded-3xl border border-white/10 p-6">
                <div className="bg-brand-lila/90 flex h-16 w-16 items-center justify-center rounded-full">
                  <Image src={card.icon} alt={card.alt} width={32} height={32} />
                </div>
                <h3 className="text-brand-fog mt-6 text-xl font-bold">
                  {t(card.titleKey)}
                </h3>
                <p className="text-brand-mist mt-4 text-base leading-7">
                  {t(card.bodyKey)}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
