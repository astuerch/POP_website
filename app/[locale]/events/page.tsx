import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {EventCard} from "@/components/event-card";
import {SectionHeading} from "@/components/section-heading";
import {pastEvents, upcomingEvents} from "@/content/events";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "events");
}

export default async function EventsPage() {
  const t = await getTranslations("events");

  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.05}>
          <section>
            <h2 className="font-heading text-brand-ink text-4xl leading-none tracking-tight">
              {t("upcoming")}
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.1}>
          <section>
            <h2 className="font-heading text-brand-ink text-4xl leading-none tracking-tight">
              {t("past")}
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
