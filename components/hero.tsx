import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {Link} from "@/i18n/navigation";
import {buttonClasses} from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden border-b border-brand-ink/10 bg-brand-dark text-white">
      <Image
        fill
        priority
        src="/images/hero/crowd_pop.jpg"
        alt="A POP Impact Lab crowd gathered in conversation."
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] uppercase backdrop-blur">
              {t("eyebrow")}
            </p>
            <h1 className="font-heading max-w-3xl text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {t("headline")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
              {t("subhead")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonClasses({variant: "secondary", size: "lg"})}
              href="/#newsletter"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              className={buttonClasses({variant: "ghost", size: "lg"})}
              href="/events"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
