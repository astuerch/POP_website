"use client";

import Image from "next/image";
import {useCallback, useEffect, useRef, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

import type {GalleryItem} from "@/content/gallery";
import {cn} from "@/lib/utils";

export interface GalleryLightboxLabels {
  close: string;
  prev: string;
  next: string;
}

/** Small per-image fade-in as each photo scrolls into view. */
function Reveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{opacity: 0, y: 8}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1}}
      transition={{duration: 0.4, ease: "easeOut"}}
    >
      {children}
    </motion.div>
  );
}

/**
 * Aspect-ratio helper used to hand each masonry tile a column + row span so
 * the grid looks curated instead of uniform. Very wide panoramas take two
 * columns, tall portraits take two rows, and the odd feature stretches two
 * columns × two rows. Everything else fills a single 1×1 cell.
 */
function spanClasses(aspect: number, index: number): string {
  // Every 11th regular photo becomes a "spotlight" that spans a full 2×2 block
  // — creates strong rhythm breaks in the flow.
  const isSpotlight = index > 0 && index % 11 === 0;
  if (isSpotlight) {
    return "col-span-2 row-span-2";
  }
  if (aspect >= 1.7) {
    return "col-span-2 row-span-1";
  }
  if (aspect <= 0.75) {
    return "col-span-1 row-span-2";
  }
  if (aspect >= 1.25) {
    return "col-span-2 row-span-1";
  }
  return "col-span-1 row-span-1";
}

/**
 * Editorial masonry gallery. The first item is rendered full-width as a
 * feature tile; the rest sit inside a CSS Grid with `grid-auto-flow: dense`
 * so wider and taller tiles are auto-packed together — no uniform 3-column
 * schematic look. Clicking any tile opens a fullscreen lightbox with
 * keyboard nav (arrows + Escape), a counter, body scroll lock and focus
 * management.
 */
export function GalleryGrid({
  items,
  labels,
  featureFirst = true,
}: {
  items: GalleryItem[];
  labels: GalleryLightboxLabels;
  /** When true the first item is rendered as a full-width feature tile. */
  featureFirst?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  const isOpen = activeIndex !== null;

  // Keyboard navigation + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const feature = featureFirst ? items[0] : undefined;
  const gridItems = featureFirst ? items.slice(1) : items;
  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <div>
      {featureFirst && feature ? (
        <Reveal className="mb-4">
          <button
            type="button"
            className="focus-visible:ring-brand-lila block w-full cursor-zoom-in overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
            onClick={(event) => open(0, event.currentTarget)}
          >
            <Image
              src={feature.src}
              alt={feature.alt}
              width={feature.width}
              height={feature.height}
              sizes="(max-width:1280px) 100vw, 1216px"
              className="h-auto w-full rounded-2xl"
              priority
            />
          </button>
        </Reveal>
      ) : null}

      {/* Editorial masonry: 4 cols on desktop, dense auto-flow so wide/tall
          spans repack into gaps. Row basis is small enough that each tile
          picks up 1-2 rows worth of height from `spanClasses`. */}
      <div className="grid grid-flow-dense auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-3 lg:auto-rows-[190px] lg:grid-cols-4">
        {gridItems.map((item, index) => {
          const globalIndex = featureFirst ? index + 1 : index;
          const aspect = item.width / item.height;
          const span = spanClasses(aspect, index);

          return (
            <Reveal
              key={item.src}
              className={cn("relative overflow-hidden rounded-2xl", span)}
            >
              <button
                type="button"
                className="focus-visible:ring-brand-lila group block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
                onClick={(event) => open(globalIndex, event.currentTarget)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            </Reveal>
          );
        })}
      </div>

      {activeItem && activeIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          onClick={close}
        >
          <div
            className="relative flex max-h-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              width={activeItem.width}
              height={activeItem.height}
              sizes="100vw"
              className="h-auto max-h-[90vh] w-auto rounded-lg object-contain"
            />
          </div>

          <button
            type="button"
            aria-label={labels.close}
            className="text-brand-fog absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl transition hover:bg-white/20"
            onClick={close}
          >
            ×
          </button>

          <button
            type="button"
            aria-label={labels.prev}
            className="text-brand-fog absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl transition hover:bg-white/20 sm:left-6"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
          >
            ←
          </button>

          <button
            type="button"
            aria-label={labels.next}
            className="text-brand-fog absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl transition hover:bg-white/20 sm:right-6"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
          >
            →
          </button>

          <p className="text-brand-mist absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium tabular-nums">
            {activeIndex + 1} / {items.length}
          </p>
        </div>
      ) : null}
    </div>
  );
}
