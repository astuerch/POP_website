import {getTranslations} from "next-intl/server";

import {AnimatedSection} from "@/components/animated-section";
import {SectionHeading} from "@/components/section-heading";
import {TeamCard} from "@/components/team-card";
import {team} from "@/content/team";
import type {AppLocale} from "@/i18n/routing";
import {getPageMetadata} from "@/lib/metadata";

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

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <div className="bg-brand-surface rounded-3xl border border-white/10 p-6 sm:p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  {t("para1")
                    .split("\n")
                    .map((line, index) =>
                      index === 0 ? (
                        <p
                          key={line}
                          className="font-heading text-brand-fog text-3xl leading-none tracking-tight sm:text-4xl"
                        >
                          {line}
                        </p>
                      ) : (
                        <p key={line} className="text-brand-mist text-lg leading-8">
                          {line}
                        </p>
                      ),
                    )}
                </div>
                <p className="text-brand-mist text-base leading-8">{t("para2")}</p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.05} amount={0.05}>
          <section className="space-y-8">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("teamTitle")}
              description={t("teamSubtitle")}
            />
            <p className="text-brand-mist max-w-3xl text-base leading-8">
              {t("teamMotto")}
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
