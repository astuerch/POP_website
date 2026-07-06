"use client";

import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

/**
 * "Rise from behind the line" reveal for big display headings: the text slides
 * up from behind a mask as the heading enters view. Wrap the text inside the
 * heading element — the heading keeps its own font/size classes, this only
 * adds the masked motion. Renders static under reduced-motion.
 */
export function RiseText({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={{y: "115%"}}
        whileInView={{y: 0}}
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.75, ease: [0.22, 1, 0.36, 1], delay}}
      >
        {children}
      </motion.span>
    </span>
  );
}
