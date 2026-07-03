import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import type {Event} from "@/content/events";
import {buttonClasses} from "@/components/ui/button";
import {Eyebrow} from "@/components/eyebrow";
import {cn} from "@/lib/utils";

export async function RegistrationWidget({event}: {event: Event}) {
  const t = await getTranslations("events");

  if (event.registrationType === "closed") {
    return (
      <div className="bg-brand-surface rounded-3xl border border-white/10 p-6">
        <h2 className="text-brand-fog text-2xl font-bold">
          {t("registrationClosedTitle")}
        </h2>
        <p className="text-brand-mist mt-3 text-base leading-7">
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
      <div className="bg-brand-surface rounded-3xl border border-white/10 p-6">
        <Eyebrow>{t("registrationEyebrow")}</Eyebrow>
        <h2 className="text-brand-fog mt-2 text-2xl font-bold">
          {t("registrationOpeningSoonTitle")}
        </h2>
        <p className="text-brand-mist mt-3 text-base leading-7">
          {t("registrationOpeningSoonBody")}
        </p>
        <Link
          className={cn("mt-6", buttonClasses({variant: "primary", size: "md"}))}
          href="/#newsletter"
        >
          {t("registrationOpeningSoonCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface rounded-3xl border border-white/10 p-6">
      <div className="space-y-4">
        <div>
          <Eyebrow>{t("registrationEyebrow")}</Eyebrow>
          <h2 className="text-brand-fog mt-2 text-2xl font-bold">
            {event.priceLabel ?? t("eventDetails")}
          </h2>
        </div>
        <p className="text-brand-mist text-base leading-7">
          {t("registrationLiveBody")}
        </p>
      </div>

      {hasEmbed ? (
        <div className="mt-6 overflow-hidden rounded-xl border border-white/15 bg-white">
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
          className={cn("mt-6", buttonClasses({variant: "primary", size: "md"}))}
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
