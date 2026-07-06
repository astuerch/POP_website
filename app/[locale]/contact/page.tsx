import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {ContactForm} from "@/components/contact-form";
import {Eyebrow} from "@/components/eyebrow";
import {SectionHeading} from "@/components/section-heading";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "contact");
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
              <div className="bg-brand-surface rounded-3xl border border-white/10 p-6 sm:p-8">
                <dl className="text-brand-mist space-y-4 text-base">
                  <div>
                    <Eyebrow as="dt">{t("email")}</Eyebrow>
                    <dd className="mt-2">
                      <a
                        className="hover:text-brand-fog transition"
                        href={`mailto:${siteConfig.email}`}
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <Eyebrow as="dt">{t("phone")}</Eyebrow>
                    <dd className="mt-2">
                      <a
                        className="hover:text-brand-fog transition"
                        href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      >
                        {siteConfig.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <Eyebrow as="dt">{t("instagram")}</Eyebrow>
                    <dd className="mt-2">
                      <a
                        className="hover:text-brand-fog transition"
                        href={siteConfig.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @pop_impactlab
                      </a>
                    </dd>
                  </div>
                  <div>
                    <Eyebrow as="dt">{t("base")}</Eyebrow>
                    <dd className="mt-2">{siteConfig.location}</dd>
                  </div>
                  <div>
                    <Eyebrow as="dt">{t("bestFor")}</Eyebrow>
                    <dd className="mt-2">{t("bestForText")}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <ContactForm />
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
