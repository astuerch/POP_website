import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {AnimatedSection} from "@/components/animated-section";
import {Eyebrow} from "@/components/eyebrow";
import {EventSchema} from "@/components/json-ld";
import {RegistrationWidget} from "@/components/registration-widget";
import {Reveal} from "@/components/reveal";
import {Stagger, StaggerItem} from "@/components/stagger";
import {events, getEventBySlug, popEditionLabel} from "@/content/events";

export async function generateStaticParams() {
  return events.map((event) => ({slug: event.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {title: "Event not found"};
  }

  const path = `/events/${slug}`;

  return {
    title: event.title,
    description: event.summary,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        de: `/de${path}`,
        "x-default": `/en${path}`,
      },
    },
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
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Title first, so mobile readers know what the page is before the
            columns stack into artwork → registration → story. */}
        <AnimatedSection amount={0.05}>
          <div className="max-w-4xl space-y-5">
            <Eyebrow>
              {event.edition ? popEditionLabel(event.edition) : event.dateLabel}
            </Eyebrow>
            <h1 className="font-heading text-brand-fog text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <p className="text-brand-lila-light text-base font-medium">
              {event.venue} · {event.location}
            </p>
            <p className="text-brand-mist text-base leading-7 sm:text-lg sm:leading-8">
              {event.summary}
            </p>
          </div>
        </AnimatedSection>

        {/* Row 1 — artwork on the left, registration beside it. */}
        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start xl:gap-14">
          <AnimatedSection amount={0.05}>
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
                <Reveal className="absolute inset-0">
                  <Image
                    fill
                    className="object-cover"
                    src={event.heroImage?.src ?? event.image.src}
                    alt={event.heroImage?.alt ?? event.image.alt}
                    sizes="(max-width:1280px) 100vw, 800px"
                    priority
                  />
                </Reveal>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <RegistrationWidget event={event} />
          </AnimatedSection>
        </div>

        {/* Row 2 — story on the left, the event facts beside it. */}
        <div className="mt-14 grid gap-12 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start xl:gap-14">
          <AnimatedSection amount={0.05}>
            <article className="space-y-12">
              <section>
                <h2 className="font-heading text-brand-fog text-3xl leading-none tracking-tight uppercase sm:text-4xl">
                  {t("about")}
                </h2>
                {event.aboutHeading ? (
                  <p className="font-serif text-brand-fog mt-6 text-2xl leading-snug italic sm:text-3xl">
                    {event.aboutHeading}
                  </p>
                ) : null}
                <div className="text-brand-mist mt-6 space-y-5 text-base leading-8 sm:text-lg sm:leading-9">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {event.schedule ? (
                <section>
                  <h2 className="font-heading text-brand-fog text-3xl leading-none tracking-tight uppercase sm:text-4xl">
                    {t("schedule")}
                  </h2>
                  <ol className="mt-8 space-y-8">
                    {event.schedule.map((item) => (
                      <li
                        key={item.title}
                        className="border-brand-lila/30 border-l-2 pl-6"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="text-brand-lila-light text-sm font-semibold tracking-[0.15em] uppercase">
                            {item.time}
                          </span>
                          <span className="text-brand-fog text-xl font-bold sm:text-2xl">
                            {item.title}
                          </span>
                        </div>
                        {item.details ? (
                          <ul className="mt-3 space-y-2">
                            {item.details.map((detail) => {
                              // "Talk title — Speaker" renders with the speaker
                              // highlighted so names stand out at a glance.
                              const [main, person] = detail.split(" — ");
                              return (
                                <li
                                  key={detail}
                                  className="text-brand-mist text-base leading-7 sm:text-lg sm:leading-8"
                                >
                                  <span className={person ? "text-brand-fog font-medium" : undefined}>
                                    {main}
                                  </span>
                                  {person ? (
                                    <span className="text-brand-lila-light font-semibold">
                                      {" "}· {person}
                                    </span>
                                  ) : null}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </article>
          </AnimatedSection>

          <AnimatedSection className="order-first xl:order-none" delay={0.08}>
            <aside className="xl:sticky xl:top-28">
              <div className="bg-brand-surface divide-y divide-white/10 rounded-3xl border border-white/10">
                <div className="p-6">
                  <Eyebrow>{t("date")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">{event.dateLabel}</p>
                </div>
                <div className="p-6">
                  <Eyebrow>{t("location")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">{event.venue}</p>
                  <p className="text-brand-mist text-sm">{event.location}</p>
                </div>
                <div className="p-6">
                  <Eyebrow>{t("format")}</Eyebrow>
                  <p className="text-brand-fog mt-2 text-base">
                    {event.priceLabel ?? t("eventDetails")}
                  </p>
                </div>
              </div>
            </aside>
          </AnimatedSection>
        </div>

        {/* Speakers span the full page width, outside the two-column blocks. */}
        <AnimatedSection className="mt-20 sm:mt-28" amount={0.05}>
          <section>
            <h2 className="font-heading text-brand-fog text-3xl leading-none tracking-tight uppercase sm:text-4xl">
              {t("speakers")}
            </h2>
            {event.lineup ? (
              <div className="mt-8 space-y-12">
                {event.lineup.map((group) => (
                  <div key={group.title} className="space-y-6">
                    {group.title ? <Eyebrow>{group.title}</Eyebrow> : null}
                    <Stagger className="grid gap-8 sm:grid-cols-2" amount={0.15}>
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
                              sizes="(max-width:640px) 100vw, 45vw"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <h3 className="text-brand-fog text-xl font-bold">
                              {person.name}
                            </h3>
                            <p className="text-brand-lila-light mt-1 text-sm font-semibold">
                              {person.role}
                            </p>
                            {person.talkTitle ? (
                              <p className="text-brand-fog mt-3 font-serif text-lg leading-snug italic">
                                “{person.talkTitle}”
                              </p>
                            ) : null}
                            <div className="text-brand-mist mt-4 space-y-3 text-sm leading-7">
                              {person.bio.split("\n\n").map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="text-brand-mist marker:text-brand-lila mt-4 list-disc space-y-3 pl-5 text-base leading-7 sm:leading-8">
                {event.speakers.map((speaker) => (
                  <li key={speaker}>{speaker}</li>
                ))}
              </ul>
            )}
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
