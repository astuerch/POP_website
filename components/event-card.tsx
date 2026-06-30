import Link from "next/link";

import type { Event } from "@/content/events";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="border-brand-ink/10 shadow-card flex h-full flex-col rounded-[1.75rem] border bg-white p-6 transition-transform duration-200 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="text-brand-slate flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-brand-paper text-brand-ink rounded-full px-3 py-1 font-medium">
            {event.status === "upcoming" ? "Upcoming" : "Past event"}
          </span>
          <span>{event.dateLabel}</span>
        </div>
        <div className="space-y-3">
          <h3 className="text-brand-ink text-2xl font-semibold">
            {event.title}
          </h3>
          <p className="text-brand-coral text-sm font-medium tracking-[0.24em] uppercase">
            {event.location}
          </p>
          <p className="text-brand-slate text-base leading-7">
            {event.summary}
          </p>
        </div>
      </div>

      <div className="border-brand-ink/10 mt-6 flex items-center justify-between gap-4 border-t pt-5">
        <span className="text-brand-slate text-sm font-medium">
          {event.priceLabel ?? "Event details"}
        </span>
        <Link
          className="text-brand-ink decoration-brand-coral text-sm font-semibold underline underline-offset-4"
          href={`/events/${event.slug}`}
        >
          View event
        </Link>
      </div>
    </article>
  );
}
