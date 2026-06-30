"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form
      className="border-brand-ink/10 shadow-card space-y-4 rounded-[1.75rem] border bg-white p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-brand-ink text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            required
            id="name"
            className="border-brand-ink/15 focus:border-brand-coral h-12 w-full rounded-2xl border px-4 transition outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-brand-ink text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            required
            id="email"
            type="email"
            className="border-brand-ink/15 focus:border-brand-coral h-12 w-full rounded-2xl border px-4 transition outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-brand-ink text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          required
          id="message"
          rows={6}
          className="border-brand-ink/15 focus:border-brand-coral w-full rounded-[1.5rem] border px-4 py-3 transition outline-none"
          placeholder="Tell POP why you’re reaching out."
        />
      </div>
      <Button type="submit">Send placeholder message</Button>
      <p className="text-brand-slate text-sm" role="status">
        {sent
          ? "Thanks — this placeholder form is intentionally not wired yet. Connect a real endpoint in a later phase."
          : "This is a styled placeholder form for Phase 1. It demonstrates layout and accessibility only."}
      </p>
    </form>
  );
}
