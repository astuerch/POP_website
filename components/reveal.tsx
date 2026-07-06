"use client";

import type {PropsWithChildren} from "react";
import {motion, useReducedMotion} from "framer-motion";

/**
 * Image "come into focus" reveal, inspired by editorial magazine sites: the
 * wrapped content starts slightly zoomed and blurred, then settles sharp as it
 * scrolls into view. Place inside an `overflow-hidden` box so the zoom is
 * clipped. Reduced-motion renders it static.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: PropsWithChildren<{className?: string; delay?: number}>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, scale: 1.12, filter: "blur(14px)"}}
      whileInView={{opacity: 1, scale: 1, filter: "blur(0px)"}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1], delay}}
    >
      {children}
    </motion.div>
  );
}
