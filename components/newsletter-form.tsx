"use client";

import {type FormEvent, useState} from "react";
import {useTranslations} from "next-intl";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // Start with an empty status line so the subhead above the form isn't
  // duplicated here; only populate on loading / success / error.
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, source: "site-newsletter-form"}),
      });

      const data = (await response.json()) as {message?: string};

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(t("success"));
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup failed", error);
      setStatus("error");
      setMessage("Unable to submit right now. Please try again later.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="sr-only" htmlFor="newsletter-email">
            {t("placeholder")}
          </label>
          <input
            required
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="text-brand-fog focus:border-brand-lila focus:ring-brand-lila/40 h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 outline-none backdrop-blur transition placeholder:text-white/50 focus:ring-2"
          />
        </div>
        <Button size="md" type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("loading") : t("button")}
        </Button>
      </div>
      {message ? (
        <p
          className={cn("text-sm", status === "error" ? "text-red-300" : "text-white/75")}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
