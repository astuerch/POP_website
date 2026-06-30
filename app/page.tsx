import Link from "next/link";
import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { EventCard } from "@/components/event-card";
import { Hero } from "@/components/hero";
import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { upcomingEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Home",
  description:
    "POP Impact Lab hosts approachable Zurich science events built around open conversation, not lectures.",
};

const nextEvent = upcomingEvents[0];

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="How POP works"
              title="Conversation-first science, built for real life"
              description="POP Impact Lab creates welcoming science evenings where the format invites questions, nuance, and exchange instead of one-way talks."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "No panel, no podium",
                  copy: "Researchers stay in the room with everybody else, making the exchange feel open, human, and dynamic.",
                },
                {
                  title: "Everyday venues",
                  copy: "Bars, cafés, and neighbourhood spaces set the tone for science that belongs in public life.",
                },
                {
                  title: "Bold, jargon-free hosting",
                  copy: "The voice is clear, curious, and approachable so new audiences can join the conversation fast.",
                },
                {
                  title: "Curiosity over certainty",
                  copy: "Events are designed to spark thoughtful discussion about the discoveries shaping our future.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6"
                >
                  <h3 className="text-brand-ink text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-brand-slate mt-3 text-base leading-7">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <section className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Next event"
                title="A live teaser for what’s coming next"
                description="The events content is driven from a single typed module so future updates stay clean and easy to manage."
              />
              <Link
                className={buttonClasses({ variant: "ghost", size: "md" })}
                href="/events"
              >
                View all events
              </Link>
            </div>
            <div className="max-w-3xl">
              <EventCard event={nextEvent} />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section
            id="newsletter"
            className="border-brand-ink/10 shadow-card rounded-[2rem] border bg-white p-8 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-brand-coral text-sm font-semibold tracking-[0.28em] uppercase">
                  Stay in the loop
                </p>
                <h2 className="text-brand-ink text-3xl font-semibold tracking-tight sm:text-4xl">
                  Newsletter signup stub, ready for MailerLite
                </h2>
                <p className="text-brand-slate text-base leading-8 sm:text-lg">
                  This Phase 1 component is styled, accessible, and wired to a
                  Next.js route handler that can be connected to MailerLite in a
                  later phase without changing the page layout.
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
