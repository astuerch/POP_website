import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {AnimatedSection} from "@/components/animated-section";
import {Eyebrow} from "@/components/eyebrow";
import {EventSchema} from "@/components/json-ld";
import {RegistrationWidget} from "@/components/registration-widget";
import {Stagger, StaggerItem} from "@/components/stagger";
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
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article",
      images: [
        {
          url: event.image.src,
          alt: event.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.summary,
      images: [event.image.src],
    },
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
      <EventSchema event={event} />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <AnimatedSection amount={0.05}>
            <article className="space-y-8">
              <div className="bg-brand-surface relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
                {!event.heroImage && event.imageFit === "contain" ? (
                  <>
                    <Image
                      fill
                      aria-hidden
                      className="scale-110 object-cover opacity-40 blur-2xl"
                      src={event.image.src}
                      alt=""
                      sizes="(max-width:1280px) 100vw, 800px"
                    />
                    <Image
                      fill
                      className="object-contain"
                      src={event.image.src}
                      alt={event.image.alt}
                      sizes="(max-width:1280px) 100vw, 800px"
                      priority
                    />
                  </>
                ) : (
                  <Image
                    fill
                    className="object-cover"
                    src={event.heroImage?.src ?? event.image.src}
                    alt={event.heroImage?.alt ?? event.image.alt}
                    priority
                  />
                )}
              </div>

              <div className="space-y-5">
                <Eyebrow>{event.dateLabel}</Eyebrow>
                <h1 className="font-heading text-brand-fog text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl">
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
                {event.aboutHeading ? (
                  <p className="font-serif text-brand-fog mt-5 text-2xl leading-snug italic sm:text-3xl">
                    {event.aboutHeading}
                  </p>
                ) : null}
                <div className="text-brand-mist mt-4 space-y-4 text-base leading-8">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {event.schedule ? (
                <section>
                  <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight">
                    {t("schedule")}
                  </h2>
                  <ol className="mt-6 space-y-6">
                    {event.schedule.map((item) => (
                      <li
                        key={item.title}
                        className="border-brand-lila/30 border-l-2 pl-5"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <span className="text-brand-lila-light text-sm font-semibold tracking-wide uppercase">
                            {item.time}
                          </span>
                          <span className="text-brand-fog text-lg font-bold">
                            {item.title}
                          </span>
                        </div>
                        {item.details ? (
                          <ul className="text-brand-mist mt-2 space-y-1 text-base leading-7">
                            {item.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <section>
                <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight">
                  {t("hosts")}
                </h2>
                {event.lineup ? (
                  <div className="mt-6 space-y-10">
                    {event.lineup.map((group) => (
                      <div key={group.title} className="space-y-5">
                        <Eyebrow>{group.title}</Eyebrow>
                        <Stagger className="grid gap-6 sm:grid-cols-2" amount={0.15}>
                          {group.people.map((person) => (
                            <StaggerItem
                              key={person.name}
                              className="bg-brand-surface flex flex-col overflow-hidden rounded-3xl border border-white/10"
                            >
                              <div className="bg-brand-lila-dark/40 relative aspect-square">
                                <Image
                                  fill
                                  className="object-cover"
                                  src={person.image}
                                  alt={person.name}
                                  sizes="(max-width:640px) 100vw, 40vw"
                                />
                              </div>
                              <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-brand-fog text-xl font-bold">
                                  {person.name}
                                </h3>
                                <p className="text-brand-lila-light mt-1 text-sm font-semibold">
                                  {person.talkTitle
                                    ? `“${person.talkTitle}”`
                                    : person.role}
                                </p>
                                <p className="text-brand-mist mt-3 text-sm leading-7">
                                  {person.bio}
                                </p>
                              </div>
                            </StaggerItem>
                          ))}
                        </Stagger>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="text-brand-mist marker:text-brand-lila mt-4 list-disc space-y-3 pl-5 text-base leading-8">
                    {event.speakers.map((speaker) => (
                      <li key={speaker}>{speaker}</li>
                    ))}
                  </ul>
                )}
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
