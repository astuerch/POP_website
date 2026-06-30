import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="bg-brand-radial border-brand-ink/10 border-b">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-brand-coral text-sm font-semibold tracking-[0.28em] uppercase">
              Zurich science outreach
            </p>
            <h1 className="text-brand-ink max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.mission}
            </h1>
            <p className="text-brand-slate max-w-2xl text-lg leading-8 sm:text-xl">
              POP Impact Lab brings researchers out of the lecture hall and into
              everyday spaces for bold, accessible conversations about the
              science shaping our future.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonClasses({ variant: "primary", size: "lg" })}
              href="/events"
            >
              Explore events
            </Link>
            <Link
              className={buttonClasses({ variant: "ghost", size: "lg" })}
              href="/#newsletter"
            >
              Join the newsletter
            </Link>
          </div>
        </div>

        <div className="border-brand-ink/10 shadow-card rounded-[2rem] border bg-white p-6 sm:p-8">
          <div className="space-y-6">
            <div className="bg-brand-mint text-brand-ink inline-flex rounded-full px-4 py-2 text-sm font-medium">
              Signature format
            </div>
            <div className="space-y-4">
              <h2 className="text-brand-ink text-2xl font-semibold sm:text-3xl">
                No panel, no podium.
              </h2>
              <p className="text-brand-slate text-base leading-8">
                POP events are designed as open conversations, not lectures.
                Guests gather around ideas, questions, and lived experience with
                researchers in the room—not on a stage.
              </p>
            </div>
            <ul className="text-brand-slate space-y-3 text-sm sm:text-base">
              <li>• approachable hosts from ETH Zurich and UZH</li>
              <li>• everyday venues like bars and cafés</li>
              <li>• room for questions, nuance, and curiosity</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
