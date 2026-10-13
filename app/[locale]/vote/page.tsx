import type {Metadata} from "next";

/**
 * Newsletter vote confirmation.
 *
 * The six newsletter buttons all point here, each with a different `?topic=`
 * value. The query string exists purely so Brevo can count clicks per link:
 * the counting happens on Brevo's side, from six distinct URLs, so this page
 * never has to read, store or forward anything.
 *
 * It renders the same confirmation for every value, for an unknown value, and
 * for no query string at all. Plain server-rendered markup, no JavaScript
 * needed — it opens straight from a phone's email client.
 */

/** Optional nicety: show which topic was voted for, when we recognise it. */
const topics: Record<string, string> = {
  robots: "Robots",
  climate: "Climate change",
  psychedelics: "Psychedelics & mental health",
  genderGap: "Gender gap in research",
  microbiome: "Microbiome & the brain",
  digitalMedicine: "Personalized digital medicine",
};

export const metadata: Metadata = {
  title: "Your vote is in",
  // A thank-you page has nothing to offer search engines, and we don't want it
  // competing with the real pages.
  robots: {index: false, follow: false},
};

export default async function VotePage({
  searchParams,
}: {
  searchParams: Promise<{topic?: string | string[]}>;
}) {
  const {topic} = await searchParams;
  const key = Array.isArray(topic) ? topic[0] : topic;
  // Unknown or missing values simply fall through to `undefined`.
  const label = key ? topics[key] : undefined;

  return (
    <div className="relative overflow-hidden">
      {/* Lilac glow behind the card. Pure CSS, so it costs nothing to load and
          survives an email client's image blocking. */}
      <div
        aria-hidden
        className="bg-brand-lila/20 pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[120px]"
      />

      <div className="relative mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="bg-brand-surface/60 rounded-[2rem] border border-white/10 px-6 py-12 text-center backdrop-blur-sm sm:px-10 sm:py-16">
          {/* Ballot tick. Drawn inline so it needs no image request. */}
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
              <path d="M4 12.5 L9.5 18 L20 6.5" />
            </svg>
          </span>

          <h1 className="font-heading text-brand-fog mt-10 text-[2.75rem] leading-[0.92] tracking-tight uppercase sm:text-6xl">
            Your vote
            <br />
            <span className="text-brand-lila">is in.</span>
          </h1>

          <p className="font-serif text-brand-fog mt-7 text-3xl leading-tight italic sm:text-4xl">
            Thank you{" "}
            {/* Upright, not italic: a slanted heart reads as a glitch.
                Swap for 💜 if you'd rather have the purple one back. */}
            <span className="ml-1 inline-block not-italic">🤍</span>
          </p>

          {label ? (
            <p className="bg-brand-lila/10 border-brand-lila/30 text-brand-lila-light mt-10 inline-block rounded-full border px-5 py-2 text-sm font-semibold tracking-wide">
              {label}
            </p>
          ) : null}

          {/* Hairline that fades out at both ends. */}
          <span
            aria-hidden
            className="via-brand-lila/50 mx-auto mt-12 block h-px w-24 bg-gradient-to-r from-transparent to-transparent"
          />

          <p className="text-brand-mist mx-auto mt-8 max-w-sm text-lg leading-8">
            Voting closes on{" "}
            <span className="text-brand-lila-light font-semibold">
              21 October
            </span>
            . We&apos;ll share the results in the next newsletter.
          </p>
        </div>
      </div>
    </div>
  );
}
