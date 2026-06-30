"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { buttonClasses } from "@/components/ui/button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <header className="border-brand-ink/10 bg-brand-paper/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          className="flex items-center gap-3"
          href="/"
          onClick={handleLinkClick}
        >
          <span className="bg-brand-ink flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white">
            POP
          </span>
          <div>
            <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
              Impact Lab
            </p>
            <p className="text-brand-slate text-sm">Science for everybody</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-brand-slate hover:text-brand-ink text-sm font-medium transition",
                pathname === link.href && "text-brand-ink",
              )}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className={buttonClasses({ variant: "secondary", size: "sm" })}
            href="/#newsletter"
            onClick={handleLinkClick}
          >
            Newsletter
          </Link>
        </nav>

        <button
          type="button"
          className="border-brand-ink/10 text-brand-ink inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
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

      <div
        id="mobile-menu"
        className={cn(
          "border-brand-ink/10 bg-brand-paper overflow-hidden border-t transition-[max-height] duration-200 lg:hidden",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:px-8"
          aria-label="Mobile primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-brand-slate hover:text-brand-ink rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white",
                pathname === link.href && "text-brand-ink bg-white",
              )}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className={buttonClasses({ variant: "secondary", size: "md" })}
            href="/#newsletter"
            onClick={handleLinkClick}
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  );
}
