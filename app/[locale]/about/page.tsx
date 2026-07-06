import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {Eyebrow} from "@/components/eyebrow";
import {TeamCard} from "@/components/team-card";
import {team} from "@/content/team";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";
import {cn} from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return getPageMetadata(locale, "about");
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const introLines = t("para1")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        {/* Intro: manifesto statement + supporting text on the left, event
            photograph on the right. The big "about POP" title is dropped —
            only the small lilac eyebrow remains. */}
        <AnimatedSection>
          <section className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <div className="space-y-8">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <div className="space-y-2">
                {introLines.map((line, index) => (
                  <p
                    key={line}
                    className={cn(
                      "text-3xl leading-tight font-semibold tracking-tight text-pretty sm:text-4xl",
                      index === introLines.length - 1
                        ? "text-brand-lila"
                        : "text-brand-fog",
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="bg-brand-lila h-0.5 w-16 rounded-full" />
              <p className="text-brand-mist max-w-xl text-lg leading-8">
                {t("para2")}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 md:aspect-auto md:h-full md:min-h-[540px]">
              <Image
                fill
                src="/images/hero/crowd_pop.jpg"
                alt="Guests in conversation at a POP Impact Lab event in Zürich."
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover object-[50%_70%]"
              />
              <div className="from-brand-night/50 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </section>
        </AnimatedSection>

        {/* Team: circular portraits, evocative titles, full bios and social
            links — matching the visual language of the rest of the site. */}
        <AnimatedSection className="mt-24 sm:mt-32" delay={0.05} amount={0.05}>
          <section className="space-y-16">
            <div className="space-y-3 text-center">
              <h2 className="font-heading text-brand-fog text-5xl leading-none tracking-tight uppercase sm:text-6xl">
                {t("teamName")}
              </h2>
              <Eyebrow>{t("teamKicker")}</Eyebrow>
              <p className="text-brand-mist mx-auto max-w-2xl text-base leading-8 sm:text-lg">
                {t("teamMotto")}
              </p>
            </div>
            <div className="grid gap-16 md:grid-cols-3 md:gap-10">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} variant="detailed" />
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
