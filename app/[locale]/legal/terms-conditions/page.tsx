import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {LegalPage} from "@/components/legal-page";
import {termsConditions} from "@/content/legal";

export const metadata: Metadata = {
  title: termsConditions.title,
  description: termsConditions.summary,
};

export default async function TermsConditionsPage() {
  const t = await getTranslations("legal");

  return (
    <LegalPage
      eyebrow={t("eyebrow")}
      title={termsConditions.title}
      summary={termsConditions.summary}
      sections={termsConditions.sections}
    />
  );
}
