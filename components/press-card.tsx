import Image from "next/image";

import type {PressArticle} from "@/content/press";
import type {AppLocale} from "@/i18n/routing";

const dateLocale: Record<AppLocale, string> = {
  en: "en-GB",
  de: "de-CH",
};

export function PressCard({
  article,
  locale,
  readLabel,
}: {
  article: PressArticle;
  locale: AppLocale;
  readLabel: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(dateLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.date));

  const excerpt = article.excerpt?.[locale];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="group bg-brand-surface hover:border-brand-lila/50 flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition duration-200 hover:-translate-y-1"
    >
      {/* White panel so the outlet logo reads regardless of its colours. */}
      <div className="flex h-28 items-center justify-center bg-white px-6 sm:h-32">
        {article.logo ? (
          <Image
            src={article.logo.src}
            alt={article.outlet}
            width={article.logo.width}
            height={article.logo.height}
            className="h-9 w-auto object-contain sm:h-10"
          />
        ) : (
          <span className="text-brand-night text-lg font-semibold tracking-wide">
            {article.outlet}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-brand-fog text-lg leading-snug font-bold text-pretty">
          {article.title}
        </h3>
        {excerpt ? (
          <p className="text-brand-mist mt-3 text-sm leading-6">{excerpt}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <span className="text-brand-mist text-sm">{formattedDate}</span>
          <span className="text-brand-fog inline-flex items-center gap-1 text-sm font-semibold">
            {readLabel}
            <span
              aria-hidden="true"
              className="text-brand-lila transition group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
