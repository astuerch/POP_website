"use client";

import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {staggerChildren: 0.12, delayChildren: 0.05},
  },
};

const headlineContainerVariants = {
  hidden: {},
  show: {
    transition: {staggerChildren: 0.05, delayChildren: 0.2},
  },
};

const blockVariants = {
  hidden: {opacity: 0, y: 24},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.45, ease: "easeOut" as const},
  },
};

const wordVariants = {
  hidden: {opacity: 0, y: 24},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.4, ease: "easeOut" as const},
  },
};

const headlineClasses =
  "font-heading max-w-5xl text-6xl leading-[0.95] tracking-tight uppercase sm:text-7xl lg:text-8xl";

/**
 * Client-side hero entrance: eyebrow → headline (word by word) → subhead →
 * CTA row → ticket chip, staggered on load (not on scroll). All copy and
 * interactive nodes are rendered on the server and passed in as props, so
 * the page itself stays a server component. Under prefers-reduced-motion
 * everything renders immediately, fully visible.
 */
export function HeroIntro({
  eyebrow,
  headlineStart,
  headlineAccent,
  subhead,
  ctas,
  chip,
}: {
  eyebrow: string;
  headlineStart: string;
  headlineAccent: string;
  subhead: string;
  ctas: ReactNode;
  chip?: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="max-w-4xl space-y-8">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur">
            {eyebrow}
          </p>
          <h1 className={headlineClasses}>
            {headlineStart} <span className="text-outline">{headlineAccent}</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">{subhead}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">{ctas}</div>
        {chip ? <div>{chip}</div> : null}
      </div>
    );
  }

  const startWords = headlineStart.split(" ").filter(Boolean);

  return (
    <motion.div
      className="max-w-4xl space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-5">
        <motion.p
          variants={blockVariants}
          className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className={headlineClasses}
          variants={headlineContainerVariants}
          initial="hidden"
          animate="show"
        >
          {startWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className="inline-block whitespace-pre"
            >
              {word}{" "}
            </motion.span>
          ))}
          <motion.span variants={wordVariants} className="text-outline inline-block">
            {headlineAccent}
          </motion.span>
        </motion.h1>
        <motion.p
          variants={blockVariants}
          className="max-w-2xl text-lg leading-8 text-white/85 sm:text-xl"
        >
          {subhead}
        </motion.p>
      </div>
      <motion.div variants={blockVariants} className="flex flex-col gap-3 sm:flex-row">
        {ctas}
      </motion.div>
      {chip ? <motion.div variants={blockVariants}>{chip}</motion.div> : null}
    </motion.div>
  );
}
