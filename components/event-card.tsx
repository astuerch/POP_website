import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import type {Event} from "@/content/events";

export async function EventCard({event}: {event: Event}) {
  const t = await getTranslations("events");

  return (
    <article className="bg-brand-surface flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition-transform duration-200 hover:-translate-y-1">
      <div className="bg-brand-lila-dark/40 relative aspect-[16/10]">
        <Image fill className="object-cover" src={event.image.src} alt={event.image.alt} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <div className="text-brand-mist flex flex-wrap items-center gap-3 text-sm">
            <span className="text-brand-fog rounded-full bg-white/10 px-3 py-1 font-medium">
              {event.status === "upcoming" ? t("upcoming") : t("past")}
            </span>
            <span>{event.dateLabel}</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-brand-fog text-2xl font-bold">{event.title}</h3>
            <p className="text-brand-lila-light text-sm font-medium">{event.location}</p>
            <p className="text-brand-mist text-base leading-7">{event.summary}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="text-brand-mist text-sm font-medium">
            {event.priceLabel ?? t("eventDetails")}
          </span>
          <Link
            className="text-brand-fog decoration-brand-lila text-sm font-semibold underline underline-offset-4"
            href={`/events/${event.slug}`}
          >
            {t("viewEvent")}
          </Link>
        </div>
      </div>
    </article>
  );
}
