import Link from "next/link";

import { legalLinks, navLinks, siteConfig, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-brand-ink/10 border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <h2 className="text-brand-ink text-2xl font-semibold">
            POP Impact Lab
          </h2>
          <p className="text-brand-slate max-w-md text-base leading-7">
            Zurich-based science outreach with a bold, approachable voice and a
            conversation-first format.
          </p>
          <p className="text-brand-slate text-sm">
            {siteConfig.location} · {siteConfig.email}
          </p>
        </div>

        <div>
          <h3 className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
            Navigate
          </h3>
          <ul className="text-brand-slate mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="hover:text-brand-ink transition"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
              Legal
            </h3>
            <ul className="text-brand-slate mt-4 space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="hover:text-brand-ink transition"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
              Social placeholders
            </h3>
            <ul className="text-brand-slate mt-4 space-y-3 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="hover:text-brand-ink transition"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
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
