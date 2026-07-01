import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {EventCard} from "@/components/event-card";
import {Hero} from "@/components/hero";
import {HowPopWorks} from "@/components/how-pop-works";
import {NewsletterForm} from "@/components/newsletter-form";
import {SectionHeading} from "@/components/section-heading";
import {TeamCard} from "@/components/team-card";
import {buttonClasses} from "@/components/ui/button";
import {upcomingEvents} from "@/content/events";
import {team} from "@/content/team";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";

const nextEvent = upcomingEvents[0];

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "home");
}

export default async function HomePage() {
  const tSocial = await getTranslations("socialProof");
  const tNext = await getTranslations("nextEvent");
  const tNewsletter = await getTranslations("newsletter");
  const tAbout = await getTranslations("about");

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <HowPopWorks />

        <AnimatedSection delay={0.05}>
          <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-brand-ink/10 bg-brand-sand shadow-card">
              <Image
                fill
                src="/images/events/event2_pic.png"
                alt="POP Impact Lab guests in conversation."
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="font-serif text-3xl leading-tight italic text-brand-ink sm:text-4xl">
                “{tSocial("quote")}”
              </p>
              <Link
                className="text-brand-ink decoration-brand-coral text-base font-semibold underline underline-offset-4"
                href="/gallery"
              >
                {tSocial("galleryLink")}
              </Link>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow={tNext("eyebrow")} title={nextEvent.title} />
              <Link className={buttonClasses({variant: "primary", size: "md"})} href="/events">
                {tNext("viewAll")}
              </Link>
            </div>
            <div className="max-w-4xl">
              <EventCard event={nextEvent} />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <section className="space-y-8">
            <SectionHeading
              eyebrow={tAbout("eyebrow")}
              title={tAbout("teamTitle")}
              description={tAbout("teamMotto")}
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
            <Link
              className="text-brand-ink decoration-brand-coral text-base font-semibold underline underline-offset-4"
              href="/about"
            >
              {tAbout("readStory")} →
            </Link>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section
            id="newsletter"
            className="relative isolate overflow-hidden rounded-[2rem] border border-brand-ink/10 bg-brand-dark p-8 text-white shadow-card sm:p-10"
          >
            <Image
              fill
              src="/images/backgrounds/background sections.jpg"
              alt="Decorative background texture"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-[0.28em] uppercase text-brand-lila">
                  {tNewsletter("eyebrow")}
                </p>
                <h2 className="font-serif text-4xl italic tracking-tight sm:text-5xl">
                  {tNewsletter("headline")}
                </h2>
                <p className="text-base leading-8 text-white/80 sm:text-lg">
                  {tNewsletter("subhead")}
                </p>
              </div>
              <NewsletterForm />
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
