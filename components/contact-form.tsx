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
      className="bg-brand-surface space-y-4 rounded-3xl border border-white/10 p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-brand-mist block text-sm font-medium" htmlFor="name">
            {t("nameLabel")}
          </label>
          <input
            required
            id="name"
            className={inputClasses}
            placeholder={t("namePlaceholder")}
          />
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
      <Button type="submit">{sent ? t("sending") : t("send")}</Button>
      <p className="text-brand-mist text-sm" role="status">
        {sent ? t("formStagedNote") : t("formIdleNote")}
      </p>
    </form>
  );
}
