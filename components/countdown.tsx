"use client";

import {useEffect, useState} from "react";

import {cn} from "@/lib/utils";

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
}

export interface CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
}

function getParts(target: number): CountdownParts | null {
  const diff = target - Date.now();
  if (diff <= 0) {
    return null;
  }
  const totalMinutes = Math.floor(diff / 60_000);
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor(totalMinutes / 60) % 24,
    minutes: totalMinutes % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * DD : HH : MM countdown to an ISO 8601 moment.
 *
 * Hydration-safe: the server (and first client render) shows an "--"
 * placeholder; real values are computed in an effect and refreshed every
 * 30 seconds (no seconds column, so there is no per-second re-render churn).
 * Renders nothing once the target moment has passed.
 */
export function Countdown({
  startsAt,
  labels,
  size = "lg",
  className,
}: {
  startsAt: string;
  labels: CountdownLabels;
  size?: "lg" | "sm";
  className?: string;
}) {
  const [parts, setParts] = useState<CountdownParts | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const target = new Date(startsAt).getTime();

    function update() {
      const next = getParts(target);
      if (next === null) {
        setExpired(true);
        setParts(null);
        return;
      }
      setParts(next);
    }

    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [startsAt]);

  if (expired) {
    return null;
  }

  const segments: Array<{value: string; label: string}> = [
    {value: parts ? pad(parts.days) : "--", label: labels.days},
    {value: parts ? pad(parts.hours) : "--", label: labels.hours},
    {value: parts ? pad(parts.minutes) : "--", label: labels.minutes},
  ];

  if (size === "sm") {
    return (
      <span
        className={cn("font-heading text-brand-fog text-base tracking-wide", className)}
        suppressHydrationWarning
      >
        {segments.map((segment, index) => (
          <span key={segment.label}>
            {index > 0 ? <span className="text-brand-lila"> : </span> : null}
            {segment.value}
            <span className="text-brand-mist text-xs">
              {segment.label.charAt(0).toLowerCase()}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className={cn("flex items-start gap-3 sm:gap-4", className)}>
      {segments.map((segment, index) => (
        <div key={segment.label} className="flex items-start gap-3 sm:gap-4">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="font-heading text-brand-lila text-4xl leading-none sm:text-5xl"
            >
              :
            </span>
          ) : null}
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-heading text-brand-fog text-4xl leading-none tabular-nums sm:text-5xl"
              suppressHydrationWarning
            >
              {segment.value}
            </span>
            <span className="text-brand-mist text-xs font-semibold tracking-[0.2em] uppercase">
              {segment.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
