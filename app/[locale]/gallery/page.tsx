import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {GalleryEventsNav} from "@/components/gallery-events-nav";
import {GalleryGrid} from "@/components/gallery-grid";
import {SectionHeading} from "@/components/section-heading";
import {galleryEvents} from "@/content/gallery";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "gallery");
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  const labels = {
    close: t("lightboxClose"),
    prev: t("lightboxPrev"),
    next: t("lightboxNext"),
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </AnimatedSection>

        {/* Sticky tab-bar for quick-jumping between editions. Renders nothing
            while there's only one event — future events auto-populate it. */}
        <div className="mt-10">
          <GalleryEventsNav
            events={galleryEvents.map((event) => ({
              id: event.id,
              title: event.title,
              dateLabel: event.dateLabel,
            }))}
          />
        </div>

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
          {galleryEvents.map((event, index) => (
            <section
              key={event.id}
              id={event.id}
              // `scroll-mt-*` so anchor jumps land under the sticky header +
              // the sticky tab-bar (~72 + 56 = 128px).
              className="scroll-mt-32"
            >
              <header className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <p className="text-brand-lila-light text-xs font-semibold tracking-[0.28em] uppercase">
                    Edition {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="text-brand-mist text-xs">
                    {event.dateLabel}
                    {event.venue ? ` · ${event.venue}` : null}
                  </span>
                </div>
                <h2 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl">
                  {event.title}
                </h2>
                {event.description ? (
                  <p className="text-brand-mist max-w-3xl text-base leading-7 sm:text-lg">
                    {event.description}
                  </p>
                ) : null}
              </header>

              <GalleryGrid items={event.items} labels={labels} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
