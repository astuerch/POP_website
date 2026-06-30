import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Placeholder terms and conditions for POP Impact Lab.",
};

export default function TermsConditionsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      summary="Placeholder terms for Phase 1. Replace this text with the final legal wording supplied for the POP site."
      sections={[
        {
          heading: "Website use",
          body: "This placeholder section reserves space for the rules governing use of the POP Impact Lab website, event information, and any future ticketing or newsletter features.",
        },
        {
          heading: "Content accuracy",
          body: "Use the final version to explain how event details, availability, and site content may change, especially while the project is still evolving through staged rebuild phases.",
        },
      ]}
    />
  );
}
