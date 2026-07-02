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
          {t("registrationClosedTitle")}
        </h2>
        <p className="text-brand-slate mt-3 text-base leading-7">
          {t("registrationClosedBody")}
        </p>
      </div>
    );
  }

  const hasEmbed = Boolean(event.registrationEmbedUrl);
  const hasRegistrationUrl = Boolean(event.registrationUrl);
  const isPaidRegistration = event.registrationType === "infomaniak-paid";
  const actionLabel =
    isPaidRegistration ? t("registrationBuyTickets") : t("registrationRegisterRsvp");

  if (!hasEmbed && !hasRegistrationUrl) {
    return (
      <div className="shadow-card rounded-[1.75rem] border border-brand-ink/10 bg-white p-6">
        <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
          {t("registrationEyebrow")}
        </p>
        <h2 className="font-heading text-brand-ink mt-2 text-3xl leading-none tracking-tight">
          {t("registrationOpeningSoonTitle")}
        </h2>
        <p className="text-brand-slate mt-3 text-base leading-7">
          {t("registrationOpeningSoonBody")}
        </p>
        <Link
          className={cn("mt-6", buttonClasses({variant: "secondary", size: "md"}))}
          href="/#newsletter"
        >
          {t("registrationOpeningSoonCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="shadow-card rounded-[1.75rem] border border-brand-ink/10 bg-white p-6">
      <div className="space-y-4">
        <div>
          <p className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
            {t("registrationEyebrow")}
          </p>
          <h2 className="font-heading text-brand-ink mt-2 text-3xl leading-none tracking-tight">
            {event.priceLabel ?? t("eventDetails")}
          </h2>
        </div>
        <p className="text-brand-slate text-base leading-7">
          {t("registrationLiveBody")}
        </p>
      </div>

      {hasEmbed ? (
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-brand-ink/15 bg-brand-paper">
          {/* Owner note: paste the Infomaniak iframe/embed URL in content/events.ts -> registrationEmbedUrl. */}
          <iframe
            title={t("registrationIframeTitle")}
            src={event.registrationEmbedUrl}
            className="min-h-[460px] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : null}

      {hasRegistrationUrl ? (
        <Link
          className={cn("mt-6", buttonClasses({variant: "secondary", size: "md"}))}
          href={event.registrationUrl!}
          target="_blank"
          rel="noreferrer"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
