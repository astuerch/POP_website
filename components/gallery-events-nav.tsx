"use client";

import {useEffect, useState} from "react";

import {cn} from "@/lib/utils";

interface EventTab {
  id: string;
  title: string;
  dateLabel: string;
}

/**
 * Sticky top-of-page tab bar for the gallery. Renders one pill per event
 * and highlights the pill that's currently in view (IntersectionObserver on
 * the target sections). Clicking a pill smoothly scrolls to that section
 * while accounting for the navbar height so the section title lands under
 * the header, not behind it.
 */
export function GalleryEventsNav({events}: {events: EventTab[]}) {
  const [activeId, setActiveId] = useState(events[0]?.id ?? "");

  useEffect(() => {
    if (events.length === 0) {
      return;
    }

    const targets = events
      .map((event) => document.getElementById(event.id))
      .filter((el): el is HTMLElement => el !== null);

    // Trigger the "active" switch once the section has scrolled through the
    // top 40% of the viewport — feels natural without flickering between
    // adjacent sections.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {rootMargin: "-40% 0px -55% 0px"},
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [events]);

  if (events.length <= 1) {
    // A single event doesn't need a tab bar; the section title already
    // establishes context. Render nothing.
    return null;
  }

  return (
    <div className="bg-brand-night/85 sticky top-[var(--navbar-height,4.5rem)] z-30 -mx-6 mb-8 border-y border-white/10 px-6 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
      <nav
        aria-label="Gallery events"
        className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => {
          const isActive = event.id === activeId;
          return (
            <a
              key={event.id}
              href={`#${event.id}`}
              className={cn(
                "inline-flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "border-brand-lila bg-brand-lila text-brand-ink"
                  : "text-brand-fog border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10",
              )}
            >
              <span>{event.title}</span>
              <span
                className={cn(
                  "text-xs font-medium tracking-wide uppercase",
                  isActive ? "text-brand-ink/70" : "text-brand-mist",
                )}
              >
                {event.dateLabel}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
