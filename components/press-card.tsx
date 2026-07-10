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
      className="group bg-brand-surface hover:border-brand-lila/50 flex h-full flex-col rounded-3xl border border-white/10 p-6 transition duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        {article.logo ? (
          <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
            <Image
              src={article.logo.src}
              alt={article.outlet}
              width={article.logo.width}
              height={article.logo.height}
              className="h-6 w-auto object-contain"
            />
          </span>
        ) : (
          <span className="text-brand-lila-light text-sm font-semibold tracking-[0.2em] uppercase">
            {article.outlet}
          </span>
        )}
        <span className="text-brand-mist mt-1 text-xs whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      <h3 className="text-brand-fog mt-5 text-xl leading-snug font-bold text-pretty">
        {article.title}
      </h3>

      {excerpt ? (
        <p className="text-brand-mist mt-3 text-base leading-7">{excerpt}</p>
      ) : null}

      <span className="text-brand-fog mt-6 inline-flex items-center gap-1 text-sm font-semibold">
        {readLabel}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
