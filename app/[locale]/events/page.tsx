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
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection delay={0.05} amount={0.05}>
          <section className="space-y-6">
            <SectionHeading title={t("upcoming")} />
            <div className="grid gap-6 sm:grid-cols-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.1} amount={0.05}>
          <section className="space-y-6">
            <SectionHeading title={t("past")} />
            <div className="grid gap-6 sm:grid-cols-2">
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
