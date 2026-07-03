import {cn} from "@/lib/utils";

/**
 * Decorative lilac glow field. Position and size it from the call site
 * (e.g. "-top-24 -right-24 h-[500px] w-[500px]") inside a `relative`
 * ancestor. Purely visual: hidden from assistive tech, ignores pointers.
 * Keep opacity at /15 or below so text contrast is unaffected.
 */
export function Glow({className}: {className?: string}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-brand-lila/15 pointer-events-none absolute rounded-full blur-[120px]",
        className,
      )}
    />
  );
}
