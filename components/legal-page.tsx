import {AnimatedSection} from "@/components/animated-section";
import {SectionHeading} from "@/components/section-heading";
import type {LegalSection} from "@/content/legal";

export function LegalPage({
  eyebrow,
  title,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading eyebrow={eyebrow} title={title} description={summary} />
        </AnimatedSection>

        <div className="mt-10 space-y-6">
          {sections.map((section, index) => (
            <AnimatedSection key={section.heading} delay={index * 0.04}>
              <section className="bg-brand-surface rounded-3xl border border-white/10 p-6 sm:p-8">
                <h2 className="font-heading text-brand-fog text-2xl leading-none tracking-tight sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="text-brand-mist mt-4 space-y-4 text-base leading-8">
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={`${section.heading}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="marker:text-brand-lila list-disc space-y-3 pl-5">
                      {section.bullets.map((item, index) => (
                        <li key={`${section.heading}-bullet-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
