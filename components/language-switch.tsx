"use client";

import {useLocale} from "next-intl";

import {usePathname, useRouter} from "@/i18n/navigation";
import {locales} from "@/i18n/routing";
import {cn} from "@/lib/utils";

/**
 * Segmented EN / DE language toggle. The current language is highlighted, the
 * other is a muted button that switches locale on the same route. Clearer than
 * a single button that showed only the *target* language (which read as if it
 * were the current one).
 */
export function LanguageSwitch({className}: {className?: string}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            aria-current={active ? "true" : undefined}
            aria-label={code === "de" ? "Auf Deutsch wechseln" : "Switch to English"}
            onClick={() => {
              if (!active) {
                router.replace(pathname, {locale: code});
              }
            }}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition",
              active
                ? "bg-brand-lila text-brand-ink"
                : "text-brand-mist hover:text-brand-fog cursor-pointer",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
