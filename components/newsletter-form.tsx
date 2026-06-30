"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState(
    "Sign up for future event drops, recap notes, and POP news.",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "site-newsletter-form" }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Thanks for joining the POP newsletter.");
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
            Email address
          </label>
          <input
            required
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border-brand-ink/15 text-brand-ink focus:border-brand-coral h-12 w-full rounded-full border bg-white px-5 transition outline-none"
          />
        </div>
        <Button size="md" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Join newsletter"}
        </Button>
      </div>
      <p
        className={`text-sm ${
          status === "error" ? "text-red-700" : "text-brand-slate"
        }`}
        role="status"
      >
        {message}
      </p>
    </form>
  );
}
