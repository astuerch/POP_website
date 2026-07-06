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
import {Stagger, StaggerItem} from "@/components/stagger";
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

      <div className="mx-auto max-w-7xl space-y-16 px-6 py-14 sm:space-y-28 sm:px-8 sm:py-20 lg:space-y-32 lg:px-12 lg:py-28">
        <HowPopWorks />

        <AnimatedSection delay={0.05} variant="left">
          <section className="space-y-8">
            <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl lg:text-6xl">
              {tSocial("title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
              <div className="bg-brand-surface relative h-[380px] overflow-hidden rounded-3xl border border-white/10">
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
              <p className="font-serif text-brand-fog text-3xl leading-tight text-pretty italic sm:text-4xl">
                “
                {tSocial.rich("quote", {
                  lilac: (chunks) => (
                    <span className="text-brand-lila">{chunks}</span>
                  ),
                  nb: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                })}
                ”
              </p>
            </div>
            </div>
            <GalleryTeaser />
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1} variant="right">
          <section className="space-y-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl lg:text-6xl">
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

        <AnimatedSection delay={0.15} variant="scale">
          <section className="relative space-y-10">
            <Glow className="top-1/2 left-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 sm:block" />
            <div className="relative space-y-3 text-center">
              <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl lg:text-6xl">
                {tAbout("teamName")}
              </h2>
              <Eyebrow>{tAbout("teamKicker")}</Eyebrow>
              <p className="text-brand-mist mx-auto max-w-2xl text-base leading-8 sm:text-lg">
                {tAbout("teamMotto")}
              </p>
            </div>
            <Stagger
              className="relative mx-auto grid max-w-4xl gap-12 sm:grid-cols-2 md:grid-cols-3"
              amount={0.15}
              stagger={0.12}
            >
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <TeamCard member={member} variant="compact" />
                </StaggerItem>
              ))}
            </Stagger>
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
            <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/50 to-black/25" />
            <Glow className="-top-20 -left-20 hidden h-[400px] w-[400px] sm:block" />
            <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="space-y-4">
                <Eyebrow>{tNewsletter("eyebrow")}</Eyebrow>
                <h2 className="font-serif text-4xl tracking-tight italic sm:text-5xl">
                  {tNewsletter("headline")}
                </h2>
                <p className="text-base leading-8 whitespace-pre-line text-white/80 sm:text-lg">
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
