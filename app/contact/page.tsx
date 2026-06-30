import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach POP Impact Lab through the placeholder contact page while live contact workflows are prepared in a later phase.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Contact"
                title="Start a conversation with POP"
                description="This page is structured for enquiries, partnerships, and venue ideas, with placeholder contact details until the live workflow is connected."
              />
              <div className="border-brand-ink/10 shadow-card rounded-[1.75rem] border bg-white p-6 sm:p-8">
                <dl className="text-brand-slate space-y-4 text-base">
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      Email
                    </dt>
                    <dd className="mt-2">{siteConfig.email}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      Base
                    </dt>
                    <dd className="mt-2">{siteConfig.location}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-coral text-sm font-semibold tracking-[0.24em] uppercase">
                      Best for
                    </dt>
                    <dd className="mt-2">
                      Event partnerships, venue ideas, collaborations, and press
                      requests.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <ContactForm />
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
