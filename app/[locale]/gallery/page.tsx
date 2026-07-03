import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {GalleryGrid} from "@/components/gallery-grid";
import {SectionHeading} from "@/components/section-heading";
import {galleryItems} from "@/content/gallery";
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

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </AnimatedSection>

        {/* The grid animates per image (inside GalleryGrid) — wrapping the
            whole multi-viewport-tall grid in AnimatedSection would keep it
            invisible because the viewport threshold is never reached. */}
        <div className="mt-10">
          <GalleryGrid
            items={galleryItems}
            labels={{
              close: t("lightboxClose"),
              prev: t("lightboxPrev"),
              next: t("lightboxNext"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
