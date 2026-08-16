import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";
import { rateLimit, clientKey } from "@/lib/rateLimit";

/**
 * Compact product catalogue for the AI assistant in n8n.
 *
 * Fetched at request time so the assistant always recommends products that
 * actually exist at their current prices — rather than a catalogue copied
 * into a prompt that silently goes stale as stock changes.
 */
// The catalogue is public data, but it is also what the AI assistant
// fetches on every conversation. Capping it stops a script hammering the
// endpoint and inflating serverless invocations.
const CATALOGUE_LIMIT = 60;
const CATALOGUE_WINDOW_MS = 60 * 1000;

export async function GET(request: Request) {
  const limit = rateLimit(
    clientKey(request),
    CATALOGUE_LIMIT,
    CATALOGUE_WINDOW_MS
  );
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    );
  }

  const catalogue = PRODUCTS.map((p) => ({
    name: p.name,
    brand: p.brand,
    price: p.price,
    size: p.size,
    gender: p.gender,
    type: p.type,
    notes: `${p.notes.top} / ${p.notes.heart} / ${p.notes.base}`,
    longevity: p.longevity,
    season: p.season,
    occasion: p.occasion,
    url: `/product/${p.id}`,
  }));

  return NextResponse.json(
    { currency: "AMD", count: catalogue.length, products: catalogue },
    { headers: { "Cache-Control": "public, s-maxage=300" } }
  );
}
