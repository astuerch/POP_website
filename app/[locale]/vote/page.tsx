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

/** Optional nicety: show which question was voted for, when we recognise it. */
const questions: Record<string, string> = {
  robots: "Would you let a robot take care of you?",
  climate: "Can we grow our way out?",
  psychedelics: "Can a trip treat depression?",
  genderGap: "Does medicine work for women?",
  microbiome: "Can your gut change your mood?",
  digitalMedicine: "Would you trade your data for better care?",
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
  const question = key ? questions[key] : undefined;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center sm:px-8 sm:py-28">
      <h1 className="font-heading text-brand-fog text-5xl leading-none tracking-tight uppercase sm:text-6xl">
        Your vote is in.
      </h1>

      <p className="font-serif text-brand-lila mt-6 text-3xl leading-tight italic sm:text-4xl">
        Thank you 💜
      </p>

      {question ? (
        <p className="text-brand-mist mt-8 border-t border-white/10 pt-8 text-base leading-7">
          You voted for{" "}
          <span className="text-brand-fog font-semibold">“{question}”</span>
        </p>
      ) : null}

      <p className="text-brand-mist mt-8 text-lg leading-8 sm:text-xl">
        Voting closes on 21 October. We&apos;ll share the results in the next
        newsletter.
      </p>
    </div>
  );
}
