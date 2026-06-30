import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Placeholder refund policy for POP Impact Lab events.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      summary="Placeholder policy for future paid events. Replace this with the approved Ticket Tailor and payment terms before ticket sales go live."
      sections={[
        {
          heading: "Free RSVP events",
          body: "This placeholder can later clarify cancellation expectations or attendance updates for free RSVP events hosted through Ticket Tailor or another registration platform.",
        },
        {
          heading: "Paid ticket events",
          body: "Use this section for refund windows, transfer rules, and any Stripe or Ticket Tailor processing terms that apply once paid registrations are enabled.",
        },
      ]}
    />
  );
}
