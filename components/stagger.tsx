"use client";

import type {PropsWithChildren} from "react";
import {motion, useReducedMotion} from "framer-motion";

/**
 * Container that reveals its <StaggerItem> children one after another as it
 * scrolls into view. Reduced-motion falls back to a plain wrapper.
 */
export function Stagger({
  children,
  className,
  amount = 0.2,
  stagger = 0.1,
  delayChildren = 0,
}: PropsWithChildren<{
  className?: string;
  amount?: number | "some" | "all";
  stagger?: number;
  delayChildren?: number;
}>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, amount}}
      variants={{
        hidden: {},
        show: {transition: {staggerChildren: stagger, delayChildren}},
      }}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a <Stagger>. */
export function StaggerItem({
  children,
  className,
}: PropsWithChildren<{className?: string}>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {opacity: 0, y: 24},
        show: {
          opacity: 1,
          y: 0,
          transition: {duration: 0.55, ease: [0.22, 1, 0.36, 1]},
        },
      }}
    >
      {children}
    </motion.div>
  );
}
