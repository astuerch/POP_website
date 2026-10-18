import type {Metadata} from "next";

import {Link} from "@/i18n/navigation";

/**
 * Seat released confirmation.
 *
 * Someone clicks "I can't make it" in an event email and lands here. Static
 * and server-rendered: no form, no JavaScript, nothing collected. The actual
 * cancellation is handled on our side, this page only confirms it.
 *
 * Layout mirrors /vote so the two emails feel like they come from the same
 * place. Navbar and footer (with the logo and the social links) come from the
 * locale layout, as on every other page.
 */

export const metadata: Metadata = {
  title: "Your seat is free",
  // A confirmation page has nothing to offer search engines.
  robots: {index: false, follow: false},
};

export default function CancelPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Same lilac glow as /vote. Pure CSS, so nothing to download. */}
      <div
        aria-hidden
        className="bg-brand-lila/20 pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[120px]"
      />

      <div className="relative mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="bg-brand-surface/60 rounded-[2rem] border border-white/10 px-6 py-12 text-center backdrop-blur-sm sm:px-10 sm:py-16">
          {/* Arrow onward: the seat moves to the next person. Where /vote has
              a tick, this is the same circle with a different mark. */}
          <span className="border-brand-lila/40 bg-brand-lila/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b6a1d2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9"
              aria-hidden
            >
              <path d="M4 12h15" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>

          <h1 className="font-heading text-brand-fog mt-10 text-[2.75rem] leading-[0.92] tracking-tight uppercase sm:text-6xl">
            Your seat
            <br />
            <span className="text-brand-lila">is free.</span>
          </h1>

          <p className="text-brand-mist mx-auto mt-8 max-w-sm text-lg leading-8">
            Thanks for telling us instead of just not showing up. Your seat is
            already on its way to the next person on the waitlist.
          </p>

          <p className="text-brand-mist mx-auto mt-5 max-w-sm text-lg leading-8">
            No hard feelings, these things happen. We&apos;re already working on
            the next POP event. Subscribe to the{" "}
            <Link
              href="/#newsletter"
              className="text-brand-lila-light decoration-brand-lila/50 font-semibold underline underline-offset-4"
            >
              newsletter
            </Link>{" "}
            to stay in the loop.
          </p>

          {/* Hairline that fades out at both ends, as on /vote. */}
          <span
            aria-hidden
            className="via-brand-lila/50 mx-auto mt-12 block h-px w-24 bg-gradient-to-r from-transparent to-transparent"
          />

          <p className="text-brand-mist/70 mx-auto mt-8 max-w-sm text-sm leading-6">
            Clicked by mistake? Just reply to the email and we&apos;ll keep your
            seat.
          </p>
        </div>
      </div>
    </div>
  );
}
