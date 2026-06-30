import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function LegalPage({
  eyebrow,
  title,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  sections: Array<{ heading: string; body: string }>;
}) {
  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={summary}
          />
        </AnimatedSection>

        <div className="mt-10 space-y-6">
          {sections.map((section, index) => (
            <AnimatedSection key={section.heading} delay={index * 0.05}>
              <section className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6 sm:p-8">
                <h2 className="text-brand-ink text-2xl font-semibold">
                  {section.heading}
                </h2>
                <p className="text-brand-slate mt-3 text-base leading-8">
                  {section.body}
                </p>
              </section>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
