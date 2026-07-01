import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {ContactForm} from "@/components/contact-form";
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
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
              <div className="shadow-card rounded-[1.75rem] border border-brand-ink/10 bg-white p-6 sm:p-8">
                <dl className="space-y-4 text-base text-brand-slate">
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      {t("email")}
                    </dt>
                    <dd className="mt-2">{siteConfig.email}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      {t("base")}
                    </dt>
                    <dd className="mt-2">{siteConfig.location}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      {t("bestFor")}
                    </dt>
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
