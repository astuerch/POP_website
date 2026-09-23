import {NextResponse} from "next/server";

import {getEventBySlug} from "@/content/events";
import {countSoldTickets} from "@/lib/infomaniak";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public, read-only sell-out status for one event.
 *
 *   GET /api/event-status?slug=social-media-how-it-changes-your-mind
 *
 * Capacity lives in content/events.ts next to the event's other facts, so a
 * new edition just needs its own `capacity` — no env var, no redeploy dance,
 * and several events can be on sale at once with different limits.
 *
 * Returns `soldOut: false` whenever the count is unavailable, so a hiccup at
 * Infomaniak can never wrongly close registration.
 */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const event = slug ? getEventBySlug(slug) : undefined;

  const capacity = event?.capacity;
  if (!event || !capacity || capacity <= 0) {
    return NextResponse.json(
      {soldOut: false, configured: false},
      {headers: {"Cache-Control": "public, max-age=60"}},
    );
  }

  const sold = await countSoldTickets(event.infomaniakEventId);

  if (sold === null) {
    return NextResponse.json(
      {soldOut: false, configured: true, available: false},
      {headers: {"Cache-Control": "public, max-age=30"}},
    );
  }

  const seatsLeft = Math.max(0, capacity - sold);

  return NextResponse.json(
    {soldOut: seatsLeft === 0, seatsLeft, capacity, configured: true, available: true},
    // Short cache: quick to react, but never hammers Infomaniak.
    {headers: {"Cache-Control": "public, max-age=60"}},
  );
}
