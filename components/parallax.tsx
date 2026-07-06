"use client";

import type {PropsWithChildren} from "react";
import {useRef} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "framer-motion";

/**
 * Subtle vertical parallax for a contained image/panel. The inner content is
 * scaled up slightly and drifts as the element passes through the viewport,
 * so keep it inside an `overflow-hidden` box. Reduced-motion renders static.
 *
 * `distance` is the total drift in px (split around centre).
 */
export function Parallax({
  children,
  className,
  distance = 36,
}: PropsWithChildren<{className?: string; distance?: number}>) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{y}}>
      {children}
    </motion.div>
  );
}
