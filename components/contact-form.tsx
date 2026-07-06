"use client";

import {type FormEvent, useState} from "react";
import {useTranslations} from "next-intl";

import {Button} from "@/components/ui/button";

const inputClasses =
  "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-brand-fog placeholder:text-white/40 outline-none transition focus:border-brand-lila focus:ring-2 focus:ring-brand-lila/40";

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
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
            className={inputClasses}
            placeholder={t("firstNamePlaceholder")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-brand-mist block text-sm font-medium" htmlFor="lastName">
            {t("lastNameLabel")}
          </label>
          <input
            required
            id="lastName"
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
          type="email"
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
          rows={6}
          className="text-brand-fog focus:border-brand-lila focus:ring-brand-lila/40 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/40 focus:ring-2"
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <label className="text-brand-mist flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          className="accent-brand-lila h-4 w-4 rounded border-white/20 bg-white/5"
        />
        {t("subscribeLabel")}
      </label>
      <Button type="submit">{sent ? t("sending") : t("send")}</Button>
      {sent ? (
        <p className="text-brand-mist text-sm" role="status">
          {t("formStagedNote")}
        </p>
      ) : null}
    </form>
  );
}
