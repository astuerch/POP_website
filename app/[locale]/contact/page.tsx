import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {ContactForm} from "@/components/contact-form";
import {Eyebrow} from "@/components/eyebrow";
import {Glow} from "@/components/glow";
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

  const details = [
    {
      label: t("email"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      label: t("phone"),
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
    },
    {
      label: t("instagram"),
      value: "@pop_impactlab",
      href: siteConfig.instagram,
      external: true,
    },
    {label: t("base"), value: siteConfig.location},
  ];

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <AnimatedSection>
          <div className="relative">
            <Glow className="-top-24 right-0 hidden h-[420px] w-[420px] sm:block" />
            <div className="relative grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <Eyebrow>{t("eyebrow")}</Eyebrow>
                  <h1 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl lg:text-6xl">
                    {t("title")}
                  </h1>
                  <p className="text-brand-mist max-w-md text-lg leading-8">
                    {t("description")}
                  </p>
                </div>

                <dl className="space-y-5">
                  {details.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 border-b border-white/10 pb-5"
                    >
                      <dt>
                        <Eyebrow className="text-xs">{item.label}</Eyebrow>
                      </dt>
                      <dd className="text-brand-fog text-lg">
                        {item.href ? (
                          <a
                            className="hover:text-brand-lila-light transition"
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-brand-lila/40 border-l-2 pl-5">
                  <Eyebrow>{t("bestFor")}</Eyebrow>
                  <p className="text-brand-mist mt-2 text-base leading-7">
                    {t("bestForText")}
                  </p>
                </div>
              </div>

              <div className="md:sticky md:top-28">
                <ContactForm />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
