import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import type {Event} from "@/content/events";
import {buttonClasses} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export async function RegistrationWidget({event}: {event: Event}) {
  const t = await getTranslations("events");

  if (event.registrationType === "closed") {
    return (
      <div className="shadow-card rounded-[1.75rem] border border-brand-ink/10 bg-white p-6">
        <h2 className="font-heading text-brand-ink text-3xl leading-none tracking-tight">
          Registration closed
        </h2>
        <p className="text-brand-slate mt-3 text-base leading-7">
          This event now lives in the POP archive. Future recaps, photos, and follow-up resources can be added here.
        </p>
      </div>
    );
  }

  const actionLabel =
    event.registrationType === "ticket-tailor-paid" ? "Buy tickets" : "Register / RSVP";

  return (
    <div className="shadow-card rounded-[1.75rem] border border-brand-ink/10 bg-white p-6">
      <div className="space-y-4">
        <div>
          <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
            Registration
          </p>
          <h2 className="font-heading text-brand-ink mt-2 text-3xl leading-none tracking-tight">
            {event.priceLabel ?? t("eventDetails")}
          </h2>
        </div>
        <p className="text-brand-slate text-base leading-7">
          POP will share the final registration flow here. For now, this block is ready for Ticket Tailor or an external registration link.
        </p>
      </div>

      <div className="border-brand-coral/40 bg-brand-paper text-brand-slate mt-6 rounded-[1.5rem] border border-dashed p-5 text-sm leading-7">
        <p>
          Placeholder embed target for event ID:
          <span className="text-brand-ink ml-2 font-semibold">
            {event.ticketTailorEventId ?? "Add a Ticket Tailor event ID"}
          </span>
        </p>
        <p className="mt-2">Mode: {event.registrationType}</p>
      </div>

      {event.registrationUrl ? (
        <Link
          className={cn("mt-6", buttonClasses({variant: "secondary", size: "md"}))}
          href={event.registrationUrl}
          target="_blank"
          rel="noreferrer"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
