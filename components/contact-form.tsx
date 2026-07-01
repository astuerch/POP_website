"use client";

import {type FormEvent, useState} from "react";
import {useTranslations} from "next-intl";

import {Button} from "@/components/ui/button";

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form
      className="shadow-card space-y-4 rounded-[1.75rem] border border-brand-ink/10 bg-white p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            required
            id="name"
            className="h-12 w-full rounded-2xl border border-brand-ink/15 px-4 text-brand-ink outline-none transition focus:border-brand-lila"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <input
            required
            id="email"
            type="email"
            className="h-12 w-full rounded-2xl border border-brand-ink/15 px-4 text-brand-ink outline-none transition focus:border-brand-lila"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>
      <div>
        <textarea
          required
          id="message"
          rows={6}
          className="w-full rounded-[1.5rem] border border-brand-ink/15 px-4 py-3 text-brand-ink outline-none transition focus:border-brand-lila"
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <Button type="submit">{sent ? t("sending") : t("send")}</Button>
      <p className="text-brand-slate text-sm" role="status">
        {sent
          ? "Thanks — this contact form is staged for the live workflow and will be connected in a later phase."
          : "Use this form for early enquiries while the live messaging workflow is being connected."}
      </p>
    </form>
  );
}
