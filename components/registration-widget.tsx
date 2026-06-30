"use client";

import Link from "next/link";

import type { Event } from "@/content/events";
import { buttonClasses } from "@/components/ui/button";

export function RegistrationWidget({ event }: { event: Event }) {
  if (event.registrationType === "closed") {
    return (
      <div className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6">
        <h2 className="text-brand-ink text-2xl font-semibold">
          Registration closed
        </h2>
        <p className="text-brand-slate mt-3 text-base leading-7">
          This event is part of the placeholder archive for Phase 1. Future
          iterations can add recap content, photos, or follow-up resources here.
        </p>
      </div>
    );
  }

  const actionLabel =
    event.registrationType === "ticket-tailor-paid"
      ? "Buy tickets"
      : "Register / RSVP";

  return (
    <div className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6">
      <div className="space-y-4">
        <div>
          <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
            Registration
          </p>
          <h2 className="text-brand-ink mt-2 text-2xl font-semibold">
            Ticket Tailor placeholder
          </h2>
        </div>
        <p className="text-brand-slate text-base leading-7">
          This client component is ready for either paid tickets or free RSVP.
          Replace the placeholder embed with the final Ticket Tailor widget when
          the production event IDs are available.
        </p>
      </div>

      <div className="border-brand-coral/40 bg-brand-paper text-brand-slate mt-6 rounded-[1.5rem] border border-dashed p-5 text-sm leading-7">
        {/* TODO: Replace this placeholder container with the Ticket Tailor embed script or iframe. */}
        {/* TODO: Use event.ticketTailorEventId and/or event.registrationUrl from content/events.ts when wiring the live integration. */}
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
          className={`mt-6 ${buttonClasses({ variant: "secondary", size: "md" })}`}
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
