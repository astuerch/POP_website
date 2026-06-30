import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { TeamCard } from "@/components/team-card";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the all-women founding team behind POP Impact Lab and the mission to make science accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow="About POP"
              title="An all-women founding team building science conversations people actually want to join"
              description="POP Impact Lab is rooted in the belief that science should move beyond institutions and into everyday public life with clarity, warmth, and confidence."
            />
            <div className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6 sm:p-8">
              <p className="text-brand-slate text-base leading-8">
                Founded in Zurich, POP brings together research, journalism, and
                community-minded hosting to create events that feel bold,
                welcoming, and genuinely interactive. The mission is to make the
                science shaping our future more accessible—not simplified into
                slogans, but opened up for thoughtful conversation.
              </p>
              <p className="text-brand-slate mt-4 text-base leading-8">
                This Phase 1 site uses placeholder founder portraits and short
                bios so the owner can later replace them with final content from
                the live Wix site and any expanded team narrative.
              </p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-12" delay={0.05}>
          <section className="grid gap-6 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
