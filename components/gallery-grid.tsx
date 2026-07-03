"use client";

import Image from "next/image";
import {useCallback, useEffect, useRef, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

import type {GalleryItem} from "@/content/gallery";

export interface GalleryLightboxLabels {
  close: string;
  prev: string;
  next: string;
}

/** Small per-image fade-in as each photo scrolls into view. */
function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
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
 * Gallery with a full-width feature tile (first item — the presentation
 * slide), a CSS-columns masonry for the rest, and a fullscreen lightbox
 * with keyboard navigation (arrow keys, Escape), a counter, scroll lock
 * and basic focus management.
 */
export function GalleryGrid({
  items,
  labels,
}: {
  items: GalleryItem[];
  labels: GalleryLightboxLabels;
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

  const [feature, ...rest] = items;
  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <div>
      {feature ? (
        <Reveal className="mb-4">
          <button
            type="button"
            className="focus-visible:ring-brand-lila block w-full cursor-zoom-in overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
            onClick={(event) => open(0, event.currentTarget)}
          >
            <Image
              src={feature.src}
              alt={feature.alt}
              width={feature.width}
              height={feature.height}
              sizes="(max-width:1280px) 100vw, 1216px"
              className="h-auto w-full rounded-xl"
              priority
            />
          </button>
        </Reveal>
      ) : null}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {rest.map((item, index) => (
          <Reveal key={item.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              className="focus-visible:ring-brand-lila block w-full cursor-zoom-in overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none"
              onClick={(event) => open(index + 1, event.currentTarget)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="h-auto w-full rounded-xl transition duration-300 hover:opacity-90"
              />
            </button>
          </Reveal>
        ))}
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
