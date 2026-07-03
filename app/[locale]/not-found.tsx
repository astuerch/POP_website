import {getTranslations} from "next-intl/server";

import {Eyebrow} from "@/components/eyebrow";
import {buttonClasses} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20 sm:px-8 lg:px-12">
      <Eyebrow>404</Eyebrow>
      <h1 className="font-heading text-brand-fog text-5xl leading-none tracking-tight">
        {t("title")}
      </h1>
      <p className="text-brand-mist text-base leading-8">{t("description")}</p>
      <Link className={buttonClasses({variant: "primary", size: "md"})} href="/">
        {t("backHome")}
      </Link>
    </div>
  );
}
