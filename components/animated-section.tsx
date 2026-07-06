"use client";

import type {PropsWithChildren} from "react";
import {motion, useReducedMotion} from "framer-motion";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

const OFFSETS: Record<RevealVariant, {x?: number; y?: number; scale?: number}> = {
  up: {y: 28},
  down: {y: -28},
  left: {x: 48},
  right: {x: -48},
  scale: {scale: 0.94},
  fade: {},
};

/**
 * Fade-and-reveal wrapper triggered when the section scrolls into view.
 *
 * `variant` controls the direction the content eases in from (default "up").
 * Alternating variants between sections gives the page subtle rhythm.
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
  variant = "up",
}: PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
  variant?: RevealVariant;
}>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, ...OFFSETS[variant]}}
      whileInView={{opacity: 1, x: 0, y: 0, scale: 1}}
      viewport={{once: true, amount}}
      transition={{duration: 0.55, ease: [0.22, 1, 0.36, 1], delay}}
    >
      {children}
    </motion.div>
  );
}
