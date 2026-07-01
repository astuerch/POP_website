import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {LegalPage} from "@/components/legal-page";
import {imprint} from "@/content/legal";

export const metadata: Metadata = {
  title: imprint.title,
  description: imprint.summary,
};

export default async function ImprintPage() {
  const t = await getTranslations("legal");

  return (
    <LegalPage
      eyebrow={t("eyebrow")}
      title={imprint.title}
      summary={imprint.summary}
      sections={imprint.sections}
    />
  );
}
