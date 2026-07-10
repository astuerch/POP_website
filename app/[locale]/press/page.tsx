import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {Eyebrow} from "@/components/eyebrow";
import {PressCard} from "@/components/press-card";
import {SectionHeading} from "@/components/section-heading";
import {Stagger, StaggerItem} from "@/components/stagger";
import {sortedPressArticles} from "@/content/press";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "press");
}

export default async function PressPage({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const t = await getTranslations("press");
  const articles = sortedPressArticles;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedSection>

        {articles.length > 0 ? (
          <AnimatedSection className="mt-12" delay={0.05} amount={0.05}>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {articles.map((article) => (
                <StaggerItem key={`${article.url}-${article.title}`}>
                  <PressCard
                    article={article}
                    locale={locale}
                    readLabel={t("readArticle")}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="mt-12" delay={0.05}>
            <div className="bg-brand-surface flex flex-col items-center gap-3 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
              <Eyebrow>{t("emptyEyebrow")}</Eyebrow>
              <p className="text-brand-fog max-w-md text-lg leading-8">
                {t("emptyTitle")}
              </p>
              <p className="text-brand-mist max-w-md text-base leading-7">
                {t("emptyBody")}
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
