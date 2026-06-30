import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20 sm:px-8 lg:px-12">
      <p className="text-brand-coral text-sm font-semibold tracking-[0.28em] uppercase">
        404
      </p>
      <h1 className="text-brand-ink text-4xl font-semibold tracking-tight">
        That POP page could not be found.
      </h1>
      <p className="text-brand-slate text-base leading-8">
        The route may still be placeholder content during the rebuild. Head back
        to the homepage or browse the events list.
      </p>
      <Link
        className={buttonClasses({ variant: "primary", size: "md" })}
        href="/"
      >
        Return home
      </Link>
    </div>
  );
}
