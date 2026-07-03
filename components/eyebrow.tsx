import type {ElementType, ReactNode} from "react";

import {cn} from "@/lib/utils";

/**
 * Small uppercase label used above headings, facts and form groups.
 * One tracking value, one color — sitewide.
 */
export function Eyebrow({
  as,
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag: ElementType = as ?? "p";

  return (
    <Tag
      className={cn(
        "text-brand-lila-light text-sm font-semibold tracking-[0.2em] uppercase",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
