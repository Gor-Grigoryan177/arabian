import { NextResponse } from "next/server";

/**
 * Server-side contact relay. Same pattern as /api/order: keeps the n8n
 * webhook URL server-only and re-validates input before forwarding.
 */
function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("CONTACT_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Messaging is not configured yet." },
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
  const contact = str(payload.contact, 80);
  const message = str(payload.message, 2000);

  if (!name || !contact || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, contact and message are required." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, message }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(
        `Contact webhook rejected: status=${res.status} body=${detail.slice(0, 500)}`
      );
      return NextResponse.json(
        { ok: false, error: "Could not send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact webhook request failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not send message." },
      { status: 502 }
    );
  }
}
