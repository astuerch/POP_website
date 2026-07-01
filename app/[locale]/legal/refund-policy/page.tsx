import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {LegalPage} from "@/components/legal-page";
import {refundPolicy} from "@/content/legal";

export const metadata: Metadata = {
  title: refundPolicy.title,
  description: refundPolicy.summary,
};

export default async function RefundPolicyPage() {
  const t = await getTranslations("legal");

  return (
    <LegalPage
      eyebrow={t("eyebrow")}
      title={refundPolicy.title}
      summary={refundPolicy.summary}
      sections={refundPolicy.sections}
    />
  );
}
