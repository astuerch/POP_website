"use client";

import Image from "next/image";
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

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

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
        {/* Brand lockup: the official POP SVG logo from `/public/images/brand/
            pop_logo.svg` (viewBox 600×300, so width auto-scales at 2:1). The
            tagline underneath is split character by character with
            `justify-between`, so it always spans exactly the same width as
            the logo above it — regardless of viewport. Neither element
            shrinks on scroll; only the surrounding padding compacts. */}
        <Link
          className="flex flex-col items-start"
          href="/"
          onClick={handleLinkClick}
        >
          <Image
            src="/images/brand/pop_logo.svg"
            alt="POP Impact Lab"
            width={600}
            height={300}
            priority
            className="h-16 w-auto sm:h-20"
          />
          <span
            aria-hidden="true"
            className="text-brand-mist -mt-0.5 flex w-full justify-between overflow-hidden text-[0.5rem] leading-none font-semibold uppercase sm:text-[0.6rem]"
          >
            {tagline.split("").map((char, index) => (
              <span key={`${char}-${index}`} className="whitespace-pre">
                {char}
              </span>
            ))}
          </span>
          <span className="sr-only">
            POP Impact Lab — {tagline}
          </span>
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

      {/* Full-screen mobile menu overlay. Sits below the sticky header (z-40 <
          header z-50) so the animated burger/X stays visible to close it.
          Large uppercase links cascade in; body scroll is locked while open. */}
      <div
        id="mobile-menu"
        className={cn(
          "bg-brand-night/98 fixed inset-0 z-40 flex flex-col backdrop-blur-xl transition-all duration-300 lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-28 pb-12 sm:px-8">
          <nav className="flex flex-col" aria-label="Mobile primary">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  transitionDelay: isOpen ? `${80 + index * 55}ms` : "0ms",
                }}
                className={cn(
                  "font-heading border-b border-white/10 py-4 text-4xl leading-none tracking-tight uppercase transition-all duration-300 sm:text-5xl",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActivePath(pathname, link.href)
                    ? "text-brand-lila"
                    : "text-brand-fog hover:text-brand-lila-light",
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div
            style={{transitionDelay: isOpen ? `${80 + navLinks.length * 55}ms` : "0ms"}}
            className={cn(
              "mt-10 transition-all duration-300",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            <Link
              className={cn(
                buttonClasses({variant: "primary", size: "lg"}),
                "w-full justify-center",
              )}
              href="/#newsletter"
              onClick={handleLinkClick}
            >
              {t("newsletter")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
