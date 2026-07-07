import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {ContactForm} from "@/components/contact-form";
import {Eyebrow} from "@/components/eyebrow";
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
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <AnimatedSection>
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
            {/* Highlighted left panel: the POP network texture behind the
                contact details gives this side presence next to the form. */}
            <div className="border-brand-lila/30 bg-brand-surface relative overflow-hidden rounded-3xl border p-8 shadow-[0_0_60px_-25px_rgba(182,161,210,0.5)] sm:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <Image
                  fill
                  alt=""
                  src="/images/backgrounds/background-sections.jpg"
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover opacity-40 brightness-[1.5] saturate-150"
                />
                <div className="from-brand-surface via-brand-surface/85 absolute inset-0 bg-gradient-to-br to-transparent" />
              </div>
              <div className="relative space-y-10">
                <div className="space-y-4">
                  <Eyebrow>{t("eyebrow")}</Eyebrow>
                  <h1 className="font-heading text-brand-fog text-4xl leading-none tracking-tight uppercase sm:text-5xl">
                    {t("title")}
                  </h1>
                  <p className="text-brand-mist max-w-md text-base leading-6 sm:text-lg sm:leading-8">
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
                      <dd className="text-brand-fog text-base sm:text-lg">
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
              </div>
            </div>

            <div className="md:sticky md:top-28">
              <ContactForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
