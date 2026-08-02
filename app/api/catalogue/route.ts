import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

/**
 * Compact product catalogue for the AI assistant in n8n.
 *
 * Fetched at request time so the assistant always recommends products that
 * actually exist at their current prices — rather than a catalogue copied
 * into a prompt that silently goes stale as stock changes.
 */
export async function GET() {
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
