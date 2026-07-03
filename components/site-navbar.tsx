"use client";

import {useLocale, useTranslations} from "next-intl";
import {useCallback, useEffect, useState} from "react";

import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {navLinks} from "@/lib/site";
import {buttonClasses} from "@/components/ui/button";
import {cn} from "@/lib/utils";

/** Returns true when the given href matches the current pathname. */
function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nextLocale = locale === "en" ? "de" : "en";
  const tagline = t("tagline");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLinkClick() {
    setIsOpen(false);
  }

  const handleLocaleSwitch = useCallback(() => {
    router.replace(pathname, {locale: nextLocale});
    setIsOpen(false);
  }, [router, pathname, nextLocale]);

  return (
    <header className="bg-brand-night/90 sticky top-0 z-50 border-b border-white/10 backdrop-blur">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-300 sm:px-8 lg:px-12",
          scrolled ? "py-2" : "py-3 sm:py-4",
        )}
      >
        {/* Text lockup: "pop" (Fraunces italic, lilac) + "impact lab" (Nunito
            bold, white) on a shared baseline, with the tagline letterspaced
            via char-level justify-between so it always spans exactly the
            width of the wordmark above. Shrinks after 24px of scroll. */}
        <Link
          className="flex flex-col items-start"
          href="/"
          onClick={handleLinkClick}
        >
          <span className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-serif text-brand-lila leading-none lowercase italic transition-all duration-300",
                scrolled ? "text-2xl" : "text-4xl sm:text-5xl",
              )}
            >
              pop
            </span>
            <span
              className={cn(
                "text-brand-fog leading-none font-bold transition-all duration-300",
                scrolled ? "text-sm" : "text-base sm:text-xl",
              )}
            >
              impact lab
            </span>
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "text-brand-mist flex w-full justify-between overflow-hidden text-[0.55rem] leading-none font-semibold uppercase transition-all duration-300 sm:text-[0.62rem]",
              scrolled ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-4 opacity-100",
            )}
          >
            {tagline.split("").map((char, index) => (
              <span key={`${char}-${index}`} className="whitespace-pre">
                {char}
              </span>
            ))}
          </span>
          <span className="sr-only">{tagline}</span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              {index > 0 ? (
                <span className="text-white/20" aria-hidden="true">
                  |
                </span>
              ) : null}
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "mx-1 rounded-md px-3 py-2 text-sm font-semibold tracking-wide uppercase transition",
                  isActivePath(pathname, link.href)
                    ? "bg-brand-lila text-brand-ink"
                    : "text-brand-fog hover:bg-white/10",
                )}
              >
                {t(link.key)}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            className={buttonClasses({variant: "primary", size: "sm"})}
            href="/#newsletter"
            onClick={handleLinkClick}
          >
            {t("newsletter")}
          </Link>
          <button
            type="button"
            className="text-brand-fog rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            onClick={handleLocaleSwitch}
          >
            {t("switchLanguage")}
          </button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="text-brand-fog rounded-full border border-white/15 px-4 py-2 text-sm font-semibold"
            onClick={handleLocaleSwitch}
          >
            {t("switchLanguage")}
          </button>
          <button
            type="button"
            className="text-brand-fog inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  isOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  isOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "bg-brand-night overflow-hidden border-t border-white/10 transition-[max-height] duration-200 lg:hidden",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:px-8" aria-label="Mobile primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-brand-mist hover:text-brand-fog rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/5",
                isActivePath(pathname, link.href) && "text-brand-lila-light bg-white/10",
              )}
              onClick={handleLinkClick}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            className={buttonClasses({variant: "primary", size: "md"})}
            href="/#newsletter"
            onClick={handleLinkClick}
          >
            {t("newsletter")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
