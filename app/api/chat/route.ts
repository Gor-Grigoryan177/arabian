import { NextResponse } from "next/server";
import { buildChatSystemPrompt } from "@/lib/ai/chatPrompt";

/**
 * Live chat endpoint. Calls DeepSeek server-side so the API key never
 * reaches the browser, and so the product catalogue is injected fresh on
 * every request rather than trusting anything the client sends.
 */

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY = 12; // caps token spend and keeps replies focused

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("DEEPSEEK_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Chat is not available right now." },
      { status: 503 }
    );
  }

  let payload: { messages?: unknown };
  try {
    payload = (await request.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No messages provided." },
      { status: 400 }
    );
  }

  // Rebuild the history defensively — never forward client input unchecked.
  const history: ChatMessage[] = payload.messages
    .slice(-MAX_HISTORY)
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        (("role" in m && (m as ChatMessage).role === "user") ||
          (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (history.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No valid messages." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.5,
        max_tokens: 400,
        messages: [
          { role: "system", content: buildChatSystemPrompt() },
          ...history,
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(
        `DeepSeek rejected: status=${res.status} body=${detail.slice(0, 400)}`
      );
      return NextResponse.json(
        { ok: false, error: "Could not get a reply." },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { ok: false, error: "Empty reply." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("DeepSeek request failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not get a reply." },
      { status: 502 }
    );
  }
}
