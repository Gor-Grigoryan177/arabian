import { NextResponse } from "next/server";

/**
 * Server-side order relay.
 *
 * The browser posts here instead of calling n8n directly. Benefits:
 * - The webhook URL is a server-only env var (no NEXT_PUBLIC_ prefix), so
 *   it is never exposed in the client bundle and cannot be scraped and
 *   spammed by anyone who views the page source.
 * - Env var is read at request time, not baked in at build time, so
 *   changing it in Vercel takes effect on the next request — no rebuild.
 * - Input is validated again on the server; the browser cannot be trusted.
 */
export async function POST(request: Request) {
  const webhookUrl = process.env.ORDER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("ORDER_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Ordering is not configured yet." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const { name, phone, product, quantity } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 }
    );
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json(
      { ok: false, error: "Phone is required." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim().slice(0, 100),
        phone: phone.trim().slice(0, 40),
        product:
          typeof product === "string" ? product.slice(0, 120) : "Not specified",
        quantity: Number(quantity) > 0 ? Math.min(Number(quantity), 50) : 1,
      }),
    });

    if (!res.ok) {
      console.error("Order webhook responded", res.status);
      return NextResponse.json(
        { ok: false, error: "Could not submit order." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Order webhook request failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not submit order." },
      { status: 502 }
    );
  }
}
