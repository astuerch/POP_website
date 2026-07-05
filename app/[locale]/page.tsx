import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {Countdown} from "@/components/countdown";
import {EventCard} from "@/components/event-card";
import {Eyebrow} from "@/components/eyebrow";
import {GalleryTeaser} from "@/components/gallery-teaser";
import {Glow} from "@/components/glow";
import {Hero} from "@/components/hero";
import {HowPopWorks} from "@/components/how-pop-works";
import {Marquee} from "@/components/marquee";
import {NewsletterForm} from "@/components/newsletter-form";
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
  const tCountdown = await getTranslations("countdown");

  return (
    <div>
      <Hero />

      <Marquee />

      <div className="mx-auto max-w-7xl space-y-24 px-6 py-20 sm:space-y-32 sm:px-8 lg:px-12 lg:py-28">
        <HowPopWorks />

        <AnimatedSection delay={0.05}>
          <section className="space-y-8">
            <h2 className="font-heading text-brand-fog text-5xl leading-none tracking-tight uppercase sm:text-6xl">
              {tSocial("title")}
            </h2>
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
              <div className="bg-brand-surface relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[480px] lg:min-h-[520px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                poster="/images/events/event2_pic.png"
                aria-label="POP Impact Lab event highlights."
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/video/Muse_video_event_1_web.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="space-y-6">
              <p className="font-serif text-brand-fog text-3xl leading-tight italic sm:text-4xl">
                “
                {tSocial.rich("quote", {
                  lilac: (chunks) => (
                    <span className="text-brand-lila">{chunks}</span>
                  ),
                })}
                ”
              </p>
              <Link className="text-brand-fog link-slide text-base font-semibold" href="/gallery">
                {tSocial("galleryLink")}
              </Link>
            </div>
            </div>
            <GalleryTeaser />
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-heading text-brand-fog text-5xl leading-none tracking-tight uppercase sm:text-6xl">
                {tNext("eyebrow")}
              </h2>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
                {nextEvent?.startsAt && !nextEvent.isTentative ? (
                  <Countdown
                    startsAt={nextEvent.startsAt}
                    labels={{
                      days: tCountdown("days"),
                      hours: tCountdown("hours"),
                      minutes: tCountdown("minutes"),
                    }}
                  />
                ) : nextEvent?.isTentative ? (
                  <div className="border-brand-lila/40 bg-brand-lila/10 text-brand-lila-light inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold">
                    <span
                      aria-hidden="true"
                      className="bg-brand-lila inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                    />
                    {tNext("saveTheDate")}
                  </div>
                ) : null}
                <Link className={buttonClasses({variant: "primary", size: "md"})} href="/events">
                  {tNext("viewAll")}
                </Link>
              </div>
            </div>
            <EventCard event={nextEvent} orientation="horizontal" />
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <section className="relative space-y-10">
            <Glow className="top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative space-y-3 text-center">
              <h2 className="font-heading text-brand-fog text-5xl leading-none tracking-tight uppercase sm:text-6xl">
                {tAbout("teamName")}
              </h2>
              <Eyebrow>{tAbout("teamKicker")}</Eyebrow>
              <p className="text-brand-mist mx-auto max-w-2xl text-base leading-8 sm:text-lg">
                {tAbout("teamMotto")}
              </p>
            </div>
            <div className="relative mx-auto grid max-w-4xl gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} variant="compact" />
              ))}
            </div>
            <div className="relative text-center">
              <Link className="text-brand-fog link-slide text-base font-semibold" href="/about">
                {tAbout("readStory")} →
              </Link>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section
            id="newsletter"
            className="border-brand-lila/40 relative isolate overflow-hidden rounded-3xl border-2 p-8 text-white shadow-[0_0_70px_-20px_rgba(182,161,210,0.55)] ring-1 ring-white/10 sm:p-10"
          >
            <Image
              fill
              src="/images/backgrounds/background-sections.jpg"
              alt="Decorative background texture"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/20" />
            <Glow className="-top-20 -left-20 h-[400px] w-[400px]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <Eyebrow>{tNewsletter("eyebrow")}</Eyebrow>
                <h2 className="font-serif text-4xl tracking-tight italic sm:text-5xl">
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
