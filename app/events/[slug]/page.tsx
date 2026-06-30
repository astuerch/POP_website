import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { RegistrationWidget } from "@/components/registration-widget";
import { getEventBySlug, events } from "@/content/events";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <AnimatedSection>
            <article className="space-y-8">
              <div className="border-brand-ink/10 bg-brand-sand shadow-card relative aspect-[16/9] overflow-hidden rounded-[2rem] border">
                <Image
                  fill
                  className="object-cover"
                  src={event.image.src}
                  alt={event.image.alt}
                  priority
                />
              </div>

              <div className="space-y-5">
                <p className="text-brand-coral text-sm font-semibold tracking-[0.28em] uppercase">
                  {event.dateLabel}
                </p>
                <h1 className="text-brand-ink text-4xl font-semibold tracking-tight sm:text-5xl">
                  {event.title}
                </h1>
                <p className="text-brand-slate text-base font-medium tracking-[0.24em] uppercase">
                  {event.venue} · {event.location}
                </p>
                <p className="text-brand-slate text-lg leading-8">
                  {event.summary}
                </p>
              </div>

              <div className="border-brand-ink/10 shadow-card grid gap-4 rounded-[1.75rem] border bg-white p-6 sm:grid-cols-3">
                <div>
                  <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                    Date
                  </p>
                  <p className="text-brand-ink mt-2 text-base">
                    {event.dateLabel}
                  </p>
                </div>
                <div>
                  <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                    Location
                  </p>
                  <p className="text-brand-ink mt-2 text-base">
                    {event.location}
                  </p>
                </div>
                <div>
                  <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                    Format
                  </p>
                  <p className="text-brand-ink mt-2 text-base">
                    {event.priceLabel ?? "Conversation event"}
                  </p>
                </div>
              </div>

              <section className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6 sm:p-8">
                <h2 className="text-brand-ink text-2xl font-semibold">
                  About this event
                </h2>
                <div className="text-brand-slate mt-4 space-y-4 text-base leading-8">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6 sm:p-8">
                <h2 className="text-brand-ink text-2xl font-semibold">
                  Hosts & conversation starters
                </h2>
                <ul className="text-brand-slate mt-4 space-y-3 text-base leading-8">
                  {event.speakers.map((speaker) => (
                    <li key={speaker}>• {speaker}</li>
                  ))}
                </ul>
              </section>
            </article>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <aside className="xl:sticky xl:top-28">
              <RegistrationWidget event={event} />
            </aside>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
