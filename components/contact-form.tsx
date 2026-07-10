"use client";

import {type FormEvent, useState} from "react";
import {useLocale, useTranslations} from "next-intl";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const inputClasses =
  "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-brand-fog placeholder:text-white/40 outline-none transition focus:border-brand-lila focus:ring-2 focus:ring-brand-lila/40";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subscribe = data.get("subscribe") === "on";

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({firstName, lastName, email, message}),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      // Fire-and-forget newsletter opt-in when the box is checked. A failure
      // here should not fail the whole contact submission.
      if (subscribe && email) {
        void fetch("/api/subscribe", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email,
            firstName,
            surname: lastName,
            source: "contact-form",
            locale,
          }),
        }).catch(() => {});
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="bg-brand-surface space-y-4 rounded-3xl border border-white/10 p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-brand-mist block text-sm font-medium" htmlFor="firstName">
            {t("firstNameLabel")}
          </label>
          <input
            required
            id="firstName"
            name="firstName"
            className={inputClasses}
            placeholder={t("firstNamePlaceholder")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-brand-mist block text-sm font-medium" htmlFor="lastName">
            {t("lastNameLabel")}
          </label>
          <input
            id="lastName"
            name="lastName"
            className={inputClasses}
            placeholder={t("lastNamePlaceholder")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-brand-mist block text-sm font-medium" htmlFor="email">
          {t("emailLabel")}
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClasses}
          placeholder={t("emailPlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <label className="text-brand-mist block text-sm font-medium" htmlFor="message">
          {t("messageLabel")}
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={6}
          className="text-brand-fog focus:border-brand-lila focus:ring-brand-lila/40 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/40 focus:ring-2"
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <label className="text-brand-mist flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          name="subscribe"
          className="accent-brand-lila h-4 w-4 rounded border-white/20 bg-white/5"
        />
        {t("subscribeLabel")}
      </label>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("sending") : t("send")}
      </Button>
      {status === "success" || status === "error" ? (
        <p
          className={cn(
            "text-sm",
            status === "error" ? "text-red-300" : "text-brand-mist",
          )}
          role="status"
        >
          {status === "success" ? t("success") : t("error")}
        </p>
      ) : null}
    </form>
  );
}
