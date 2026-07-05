import {ImageResponse} from "next/og";

import type {AppLocale} from "@/i18n/routing";

export const alt =
  "POP Impact Lab — Where science meets society. Zurich science events.";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

/**
 * Dynamic Open Graph image, generated at request time by Next's ImageResponse
 * (Satori) so the result is a real, correctly-rendered PNG — no ImageMagick /
 * font-fallback surprises. Locale-aware: EN uses the English tagline, DE uses
 * the German one. Layout is deliberately flat and uses only web-safe fallbacks.
 */
export default async function OgImage({
  params,
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const isDE = locale === "de";

  const eyebrow = isDE
    ? "ZÜRICH · WISSENSCHAFTSEVENTS"
    : "ZURICH · SCIENCE EVENTS";
  const taglineA = isDE
    ? "Wissenschaft trifft Gesellschaft —"
    : "Where science meets society —";
  const taglineB = isDE
    ? "an den Orten, an denen du dich sowieso triffst."
    : "in the places you already go.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0A0A0B 0%, #1A1225 60%, #2A1F3D 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Lilac glow — top right */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(182,161,210,0.45) 0%, rgba(182,161,210,0) 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        {/* Lilac glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-140px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(182,161,210,0.28) 0%, rgba(182,161,210,0) 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Eyebrow tag */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "rgba(214,200,240,0.12)",
            border: "1px solid rgba(214,200,240,0.35)",
            borderRadius: "999px",
            padding: "12px 26px",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#D6C8F0",
          }}
        >
          {eyebrow}
        </div>

        {/* Spacer to push content down */}
        <div style={{flex: 1, display: "flex"}} />

        {/* Main title */}
        <div
          style={{
            display: "flex",
            fontSize: "116px",
            fontWeight: 900,
            letterSpacing: "-4px",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          POP IMPACT LAB
        </div>

        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: "160px",
            height: "8px",
            background: "#B6A1D2",
            borderRadius: "4px",
            marginBottom: "36px",
          }}
        />

        {/* Tagline — two lines */}
        <div
          style={{
            display: "flex",
            fontSize: "44px",
            fontStyle: "italic",
            color: "#FFFFFF",
            lineHeight: 1.15,
          }}
        >
          {taglineA}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "44px",
            fontStyle: "italic",
            color: "#D6C8F0",
            lineHeight: 1.15,
            marginBottom: "48px",
          }}
        >
          {taglineB}
        </div>

        {/* Footer meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#C9C9D2",
            letterSpacing: "2px",
          }}
        >
          <div style={{display: "flex"}}>popimpactlab.com</div>
          <div style={{display: "flex"}}>
            ETH ZÜRICH × UZH · APÉRO × CONVERSATION
          </div>
        </div>
      </div>
    ),
    {...size},
  );
}
