import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { EventCard } from "@/components/event-card";
import { SectionHeading } from "@/components/section-heading";
import { pastEvents, upcomingEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past POP Impact Lab events, from free RSVP gatherings to future ticketed conversations.",
};

export default function EventsPage() {
  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Events"
            title="Upcoming and past gatherings"
            description="All event pages are powered by structured TypeScript content so titles, dates, registration links, and future archive updates stay in one place."
          />
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.05}>
          <section>
            <h2 className="text-brand-ink text-2xl font-semibold">Upcoming</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.1}>
          <section>
            <h2 className="text-brand-ink text-2xl font-semibold">
              Past events
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
