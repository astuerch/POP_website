"use client";

import {type FormEvent, useState} from "react";
import {useTranslations} from "next-intl";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const inputClasses =
  "text-brand-fog focus:border-brand-lila focus:ring-brand-lila/40 h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 outline-none backdrop-blur transition placeholder:text-white/50 focus:ring-2";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("firstName") ?? "").trim();
    const surname = String(data.get("surname") ?? "").trim();

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          firstName,
          surname,
          source: "site-newsletter-form",
        }),
      });

      const payload = (await response.json()) as {message?: string};

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(t("success"));
      form.reset();
    } catch (error) {
      console.error("Newsletter signup failed", error);
      setStatus("error");
      setMessage("Unable to submit right now. Please try again later.");
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="firstName"
          autoComplete="given-name"
          placeholder={t("firstNamePlaceholder")}
          aria-label={t("firstNamePlaceholder")}
          className={inputClasses}
        />
        <input
          name="surname"
          autoComplete="family-name"
          placeholder={t("surnamePlaceholder")}
          aria-label={t("surnamePlaceholder")}
          className={inputClasses}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className={inputClasses}
        />
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
