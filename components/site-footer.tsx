"use client";

import {useLocale, useTranslations} from "next-intl";

import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {legalLinks, navLinks, siteConfig} from "@/lib/site";
import {Eyebrow} from "@/components/eyebrow";
import {Glow} from "@/components/glow";
import {PartnersStrip} from "@/components/partners-strip";

export function SiteFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const nextLocale = locale === "en" ? "de" : "en";

  // Which top-level page are we on? `usePathname()` strips the locale, so a
  // URL like /en/events/foo comes in here as /events/foo. Legal pages and
  // deeper routes bucket into their first segment.
  const topSegment = (() => {
    if (pathname === "/" || pathname === "") return "home";
    const parts = pathname.replace(/^\//, "").split("/");
    return parts[0] ?? "home";
  })();

  // Section visibility per page — as agreed with the owner.
  const showFinale = ["home", "events", "gallery"].includes(topSegment);
  const showPartners = ["home", "events", "contact"].includes(topSegment);

  // Poster finale line: everything before the last word in white, the last
  // word (with its period) in lilac.
  const finale = tFooter("finale");
  const finaleWords = finale.split(" ");
  const finaleLast = finaleWords.pop();
  const finaleStart = finaleWords.join(" ");

  return (
    <footer className="bg-brand-ink/40 border-t border-white/10">
      {showFinale ? (
        <div className="relative overflow-hidden border-b border-white/10 px-6 py-16 text-center sm:py-20">
          <Glow className="top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
          <p className="font-heading text-brand-fog relative text-5xl leading-none tracking-tight uppercase sm:text-7xl">
            {finaleStart} <span className="text-brand-lila">{finaleLast}</span>
          </p>
        </div>
      ) : null}
      {showPartners ? <PartnersStrip /> : null}
      {/* Footer layout: left column carries the wordmark, tagline, contact
          line and language switch (roomy). Right column groups Navigate + Legal
          side by side, close together, and is vertically centered relative to
          the taller left column via `lg:items-center`. */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.7fr_1fr] lg:items-center lg:px-12">
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
            className="text-brand-fog link-slide text-sm font-semibold"
            onClick={() => router.replace(pathname, {locale: nextLocale})}
          >
            {tFooter("switchLanguage")}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8">
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
