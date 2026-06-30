import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Placeholder imprint information for POP Impact Lab.",
};

export default function ImprintPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Imprint"
      summary="Placeholder imprint details for Phase 1. Add the final responsible entity, address, and legal contact information before launch."
      sections={[
        {
          heading: "Responsible party",
          body: "This placeholder shows where POP Impact Lab will list the legally responsible party, postal address, and official points of contact for the production website.",
        },
        {
          heading: "Contact information",
          body: "Add the final email, legal representative details, and any jurisdiction-specific publication requirements once they are confirmed by the site owner.",
        },
      ]}
    />
  );
}
