"use client";

import {useLocale, useTranslations} from "next-intl";

import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {legalLinks, navLinks, siteConfig} from "@/lib/site";
import {Eyebrow} from "@/components/eyebrow";
import {PartnersStrip} from "@/components/partners-strip";

export function SiteFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const nextLocale = locale === "en" ? "de" : "en";

  return (
    <footer className="bg-brand-ink/40 border-t border-white/10">
      <PartnersStrip />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <h2 className="font-heading text-brand-fog text-4xl leading-none">
            POP Impact Lab
          </h2>
          <p className="text-brand-mist max-w-md text-base leading-7">
            {tFooter("tagline")}
          </p>
          <p className="text-brand-mist text-sm">
            {siteConfig.location} · {siteConfig.email}
          </p>
          <button
            type="button"
            className="text-brand-fog decoration-brand-lila text-sm font-semibold underline underline-offset-4"
            onClick={() => router.replace(pathname, {locale: nextLocale})}
          >
            {tFooter("switchLanguage")}
          </button>
        </div>

        <div>
          <Eyebrow as="h3">{tFooter("navigate")}</Eyebrow>
          <ul className="text-brand-mist mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-brand-fog transition" href={link.href}>
                  {tNav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <Eyebrow as="h3">{tFooter("legal")}</Eyebrow>
            <ul className="text-brand-mist mt-4 space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-brand-fog transition" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
