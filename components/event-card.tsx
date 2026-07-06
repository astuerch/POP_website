import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import type {Event} from "@/content/events";
import {cn} from "@/lib/utils";

export async function EventCard({
  event,
  orientation = "vertical",
}: {
  event: Event;
  orientation?: "vertical" | "horizontal";
}) {
  const t = await getTranslations("events");
  const isHorizontal = orientation === "horizontal";

  return (
    <article
      className={cn(
        "bg-brand-surface hover:border-brand-lila/50 flex h-full overflow-hidden rounded-3xl border border-white/10 transition duration-200 hover:-translate-y-1",
        isHorizontal ? "flex-col md:min-h-[360px] md:flex-row" : "flex-col",
      )}
    >
      <div
        className={cn(
          "bg-brand-lila-dark/40 relative aspect-[16/10] overflow-hidden",
          isHorizontal && "md:aspect-auto md:w-[42%] md:shrink-0 md:self-stretch",
        )}
      >
        {event.imageFit === "contain" ? (
          <>
            <Image
              fill
              aria-hidden
              className="scale-110 object-cover opacity-40 blur-2xl"
              src={event.image.src}
              alt=""
              sizes={isHorizontal ? "(max-width:1024px) 100vw, 40vw" : "(max-width:1024px) 100vw, 33vw"}
            />
            <Image
              fill
              className="object-contain"
              src={event.image.src}
              alt={event.image.alt}
              sizes={isHorizontal ? "(max-width:1024px) 100vw, 40vw" : "(max-width:1024px) 100vw, 33vw"}
            />
          </>
        ) : (
          <Image
            fill
            className="object-cover object-[center_58%]"
            src={event.image.src}
            alt={event.image.alt}
            sizes={isHorizontal ? "(max-width:1024px) 100vw, 40vw" : "(max-width:1024px) 100vw, 33vw"}
          />
        )}
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
            className="text-brand-fog link-slide text-sm font-semibold"
            href={`/events/${event.slug}`}
          >
            {t("viewEvent")}
          </Link>
        </div>
      </div>
    </article>
  );
}
