"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useCallback, useState} from "react";

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

  const nextLocale = locale === "en" ? "de" : "en";

  function handleLinkClick() {
    setIsOpen(false);
  }

  const handleLocaleSwitch = useCallback(() => {
    router.replace(pathname, {locale: nextLocale});
    setIsOpen(false);
  }, [router, pathname, nextLocale]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-ink/10 bg-brand-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <Link className="flex items-center" href="/" onClick={handleLinkClick}>
          <Image
            src="/images/brand/pop_logo.svg"
            alt="POP Impact Lab logo"
            width={180}
            height={52}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-brand-slate hover:text-brand-ink text-sm font-medium transition",
                isActivePath(pathname, link.href) && "text-brand-ink",
              )}
              onClick={handleLinkClick}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            className={buttonClasses({variant: "secondary", size: "sm"})}
            href="/#newsletter"
            onClick={handleLinkClick}
          >
            {t("newsletter")}
          </Link>
          <button
            type="button"
            className="rounded-full border border-brand-ink/10 px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-white"
            onClick={handleLocaleSwitch}
          >
            {t("switchLanguage")}
          </button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="rounded-full border border-brand-ink/10 px-4 py-2 text-sm font-semibold text-brand-ink"
            onClick={handleLocaleSwitch}
          >
            {t("switchLanguage")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-ink/10 text-brand-ink"
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
          "overflow-hidden border-t border-brand-ink/10 bg-brand-paper transition-[max-height] duration-200 lg:hidden",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:px-8" aria-label="Mobile primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-brand-slate hover:text-brand-ink rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white",
                isActivePath(pathname, link.href) && "bg-white text-brand-ink",
              )}
              onClick={handleLinkClick}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            className={buttonClasses({variant: "secondary", size: "md"})}
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
