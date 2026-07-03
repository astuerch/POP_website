"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-and-rise wrapper triggered when the section scrolls into view.
 *
 * `amount` controls how much of the element must be visible before the
 * animation fires. For very tall content (long grids, legal pages) the
 * default of 0.2 can never be reached — pass a small value (e.g. 0.05)
 * so the content is guaranteed to reveal.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
}>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
