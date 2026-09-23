"use client";

import {type FormEvent, type ReactNode, useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Eyebrow} from "@/components/eyebrow";
import {cn} from "@/lib/utils";

const inputClasses =
  "text-brand-fog focus:border-brand-lila focus:ring-brand-lila/40 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 outline-none transition placeholder:text-white/40 focus:ring-2";

export interface WaitlistCopy {
  eyebrow: string;
  title: string;
  body: string;
  firstName: string;
  lastName: string;
  email: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
}

/**
 * Shows the normal registration CTA until the event sells out, then swaps in
 * the waiting-list form. The switch is automatic: `/api/event-status` compares
 * valid tickets against the configured capacity, so nobody has to flip it by
 * hand the moment the last place goes.
 *
 * While the status is unknown (loading, or Infomaniak unreachable) the normal
 * CTA stays visible — failing "open" is far safer than wrongly closing sales.
 */
export function WaitlistGate({
  slug,
  copy,
  children,
}: {
  slug: string;
  copy: WaitlistCopy;
  children: ReactNode;
}) {
  const [soldOut, setSoldOut] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    let active = true;
    fetch(`/api/event-status?slug=${encodeURIComponent(slug)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: {soldOut?: boolean} | null) => {
        if (active && data?.soldOut) setSoldOut(true);
      })
      .catch(() => {
        // Keep registration open if the check fails.
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!soldOut) return <>{children}</>;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName: String(data.get("firstName") ?? "").trim(),
          lastName: String(data.get("lastName") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h2 className="text-brand-fog mt-2 text-2xl font-bold">{copy.title}</h2>
      <p className="text-brand-mist mt-3 text-base leading-7">{copy.body}</p>

      {status === "success" ? (
        <p className="text-brand-fog mt-6 text-base leading-7" role="status">
          {copy.success}
        </p>
      ) : (
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              name="firstName"
              autoComplete="given-name"
              placeholder={copy.firstName}
              aria-label={copy.firstName}
              className={inputClasses}
            />
            <input
              name="lastName"
              autoComplete="family-name"
              placeholder={copy.lastName}
              aria-label={copy.lastName}
              className={inputClasses}
            />
          </div>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder={copy.email}
            aria-label={copy.email}
            className={inputClasses}
          />
          <Button type="submit" size="md" disabled={status === "loading"}>
            {status === "loading" ? copy.sending : copy.submit}
          </Button>
          {status === "error" ? (
            <p className={cn("text-sm", "text-red-300")} role="status">
              {copy.error}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
