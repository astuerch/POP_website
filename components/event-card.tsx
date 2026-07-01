import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import type {Event} from "@/content/events";

export async function EventCard({event}: {event: Event}) {
  const t = await getTranslations("events");

  return (
    <article className="shadow-card flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-ink/10 bg-white transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[16/10] bg-brand-sand">
        <Image fill className="object-cover" src={event.image.src} alt={event.image.alt} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <div className="text-brand-slate flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-brand-paper px-3 py-1 font-medium text-brand-ink">
              {event.status === "upcoming" ? t("upcoming") : t("past")}
            </span>
            <span>{event.dateLabel}</span>
          </div>
          <div className="space-y-3">
            <h3 className="font-heading text-brand-ink text-3xl leading-none tracking-tight">
              {event.title}
            </h3>
            <p className="text-brand-coral text-sm font-medium tracking-[0.24em] uppercase">
              {event.location}
            </p>
            <p className="text-brand-slate text-base leading-7">{event.summary}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-brand-ink/10 pt-5">
          <span className="text-brand-slate text-sm font-medium">
            {event.priceLabel ?? t("eventDetails")}
          </span>
          <Link
            className="text-brand-ink decoration-brand-coral text-sm font-semibold underline underline-offset-4"
            href={`/events/${event.slug}`}
          >
            {t("viewEvent")}
          </Link>
        </div>
      </div>
    </article>
  );
}
