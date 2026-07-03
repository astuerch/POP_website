import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Countdown} from "@/components/countdown";
import {Glow} from "@/components/glow";
import {HeroIntro} from "@/components/hero-intro";
import {buttonClasses} from "@/components/ui/button";
import {upcomingEvents} from "@/content/events";
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("hero");
  const tCountdown = await getTranslations("countdown");

  const nextEvent = upcomingEvents[0];

  const ctas = (
    <>
      <Link
        className={cn(
          buttonClasses({variant: "primary", size: "lg"}),
          "shadow-[0_0_40px_-8px_rgba(182,161,210,0.55)]",
        )}
        href="/#newsletter"
      >
        {t("ctaPrimary")}
      </Link>
      <Link className={buttonClasses({variant: "ghost", size: "lg"})} href="/events">
        {t("ctaSecondary")}
      </Link>
    </>
  );

  const chip = nextEvent?.startsAt ? (
    <Link
      href={`/events/${nextEvent.slug}`}
      className="group inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
    >
      <span className="text-brand-fog text-sm font-semibold">{nextEvent.dateLabel}</span>
      <span className="hidden text-white/40 sm:inline" aria-hidden="true">
        ·
      </span>
      <span className="hidden text-sm text-white/70 sm:inline">{nextEvent.venue}</span>
      <span className="text-white/40" aria-hidden="true">
        ·
      </span>
      <Countdown
        startsAt={nextEvent.startsAt}
        size="sm"
        labels={{
          days: tCountdown("days"),
          hours: tCountdown("hours"),
          minutes: tCountdown("minutes"),
        }}
      />
      <span
        aria-hidden="true"
        className="text-brand-lila inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  ) : undefined;

  return (
    <section className="bg-brand-night relative isolate overflow-hidden border-b border-white/10 text-white">
      <Image
        fill
        priority
        src="/images/hero/crowd_pop.jpg"
        alt="A POP Impact Lab crowd gathered in conversation."
        className="object-cover object-[50%_72%]"
      />
      <div className="from-brand-night/90 absolute inset-0 bg-gradient-to-r via-black/60 to-black/25" />
      <div className="to-brand-night/60 absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />
      <Glow className="-top-32 -right-24 h-[500px] w-[500px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <HeroIntro
          eyebrow={t("eyebrow")}
          headlineStart={t("headlineStart")}
          headlineAccent={t("headlineAccent")}
          subhead={t("subhead")}
          ctas={ctas}
          chip={chip}
        />
      </div>
    </section>
  );
}
