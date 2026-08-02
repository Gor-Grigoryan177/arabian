import { NextResponse } from "next/server";

/**
 * Server-side order relay.
 *
 * The browser posts here instead of calling n8n directly, so the webhook
 * URL stays server-only (not in the client bundle, not scrapeable) and is
 * read at request time rather than baked in at build time.
 *
 * Input is re-validated here — the browser cannot be trusted.
 */

function str(value: unknown, max: number, fallback = ""): string {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, max)
    : fallback;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.ORDER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("ORDER_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Ordering is not configured yet." },
      { status: 503 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = str(payload.name, 100);
  const phone = str(payload.phone, 40);
  const address = str(payload.address, 200);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 }
    );
  }
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Phone is required." },
      { status: 400 }
    );
  }
  if (!address) {
    return NextResponse.json(
      { ok: false, error: "Address is required." },
      { status: 400 }
    );
  }

  const quantity =
    Number(payload.quantity) > 0
      ? Math.min(Math.floor(Number(payload.quantity)), 50)
      : 1;
  const unitPrice =
    Number(payload.unitPrice) > 0 ? Number(payload.unitPrice) : 0;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address,
        city: str(payload.city, 60, "Yerevan"),
        // Recomputed server-side so a tampered client cannot send a fake total.
        product: str(payload.product, 120, "Not specified"),
        brand: str(payload.brand, 60),
        size: str(payload.size, 30),
        quantity,
        unitPrice,
        total: unitPrice * quantity,
        paymentMethod:
          payload.paymentMethod === "transfer"
            ? "Bank transfer"
            : "Cash on delivery",
        note: str(payload.note, 500),
      }),
    });

    if (!res.ok) {
      // Log what n8n actually said — a bare status code makes 502s
      // impossible to diagnose from the Vercel function logs.
      const detail = await res.text().catch(() => "<no body>");
      console.error(
        `Order webhook rejected: status=${res.status} url=${webhookUrl} body=${detail.slice(0, 500)}`
      );
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
