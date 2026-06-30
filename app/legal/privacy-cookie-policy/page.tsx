import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description: "Placeholder privacy and cookie policy for POP Impact Lab.",
};

export default function PrivacyCookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy & Cookie Policy"
      summary="Placeholder legal content for Phase 1. Replace this page with owner-approved copy before launch."
      sections={[
        {
          heading: "Data collection",
          body: "This placeholder policy marks where POP Impact Lab will explain what visitor data is collected, why it is used, and how newsletter or contact submissions are processed once live integrations are enabled.",
        },
        {
          heading: "Cookies & analytics",
          body: "Use this section later to describe any analytics, cookie consent tooling, or embedded third-party services that become part of the production site.",
        },
      ]}
    />
  );
}
