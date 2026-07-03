import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {AnimatedSection} from "@/components/animated-section";
import {Eyebrow} from "@/components/eyebrow";
import {RegistrationWidget} from "@/components/registration-widget";
import {events, getEventBySlug} from "@/content/events";

export async function generateStaticParams() {
  return events.map((event) => ({slug: event.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {title: "Event not found"};
  }

  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const event = getEventBySlug(slug);
  const t = await getTranslations("events");

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <AnimatedSection amount={0.05}>
            <article className="space-y-8">
              <div className="bg-brand-surface relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
                <Image fill className="object-cover" src={event.image.src} alt={event.image.alt} priority />
              </div>

              <div className="space-y-5">
                <Eyebrow>{event.dateLabel}</Eyebrow>
                <h1 className="font-heading text-brand-fog text-5xl leading-none tracking-tight sm:text-6xl">
                  {event.title}
                </h1>
                <p className="text-brand-lila-light text-base font-medium">
                  {event.venue} · {event.location}
                </p>
                <p className="text-brand-mist text-lg leading-8">{event.summary}</p>
              </div>

              <div className="bg-brand-surface grid gap-4 rounded-3xl border border-white/10 p-6 sm:grid-cols-3">
                <div>
                  <Eyebrow>{t("date")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">{event.dateLabel}</p>
                </div>
                <div>
                  <Eyebrow>{t("location")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">{event.location}</p>
                </div>
                <div>
                  <Eyebrow>{t("format")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">
                    {event.priceLabel ?? t("eventDetails")}
                  </p>
                </div>
              </div>

              <section>
                <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight">
                  {t("about")}
                </h2>
                <div className="text-brand-mist mt-4 space-y-4 text-base leading-8">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight">
                  {t("hosts")}
                </h2>
                <ul className="text-brand-mist marker:text-brand-lila mt-4 list-disc space-y-3 pl-5 text-base leading-8">
                  {event.speakers.map((speaker) => (
                    <li key={speaker}>{speaker}</li>
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
