import {getTranslations} from "next-intl/server";

import {cn} from "@/lib/utils";

/**
 * Full-bleed poster marquee. The track contains two identical halves so the
 * CSS translateX(-50%) keyframe loops seamlessly (see globals.css). Items
 * alternate solid white and lilac outline. Pauses on hover; static single
 * row under prefers-reduced-motion. Purely decorative, so the whole strip
 * is hidden from assistive tech.
 */
export async function Marquee() {
  const t = await getTranslations("marquee");
  const items = t("items")
    .split("×")
    .map((item) => item.trim())
    .filter(Boolean);

  // Repeat the base items so one half of the track is comfortably wider
  // than any viewport, then render the half twice for a seamless wrap.
  const half = Array.from({length: 4}, () => items).flat();

  const renderHalf = () => (
    <div className="flex shrink-0 items-center">
      {half.map((item, index) => (
        <span key={`${item}-${index}`} className="flex shrink-0 items-center">
          <span
            className={cn(
              "font-heading text-4xl whitespace-nowrap uppercase sm:text-5xl",
              index % 2 === 1 ? "text-outline" : "text-brand-fog",
            )}
          >
            {item}
          </span>
          <span className="text-brand-lila mx-5 text-2xl sm:text-3xl">×</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-white/10 py-4"
    >
      <div className="marquee-track flex w-max">
        {renderHalf()}
        {renderHalf()}
      </div>
    </div>
  );
}
