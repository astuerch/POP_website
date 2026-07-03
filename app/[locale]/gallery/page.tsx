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

        <AnimatedSection className="mt-10" delay={0.05}>
          <GalleryGrid items={galleryItems} />
        </AnimatedSection>
      </div>
    </div>
  );
}
