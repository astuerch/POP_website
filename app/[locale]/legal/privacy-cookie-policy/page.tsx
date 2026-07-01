import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {LegalPage} from "@/components/legal-page";
import {privacyPolicy} from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.summary,
};

export default async function PrivacyCookiePolicyPage() {
  const t = await getTranslations("legal");

  return (
    <LegalPage
      eyebrow={t("eyebrow")}
      title={privacyPolicy.title}
      summary={privacyPolicy.summary}
      sections={privacyPolicy.sections}
    />
  );
}
