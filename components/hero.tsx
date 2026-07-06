import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Glow} from "@/components/glow";
import {HeroIntro} from "@/components/hero-intro";
import {buttonClasses} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("hero");

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
      <Glow className="-top-32 -right-24 hidden h-[500px] w-[500px] sm:block" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <HeroIntro
          eyebrow={t("eyebrow")}
          headlineStart={t("headlineStart")}
          headlineAccent={t("headlineAccent")}
          subhead={t("subhead")}
          ctas={ctas}
        />
      </div>
    </section>
  );
}
