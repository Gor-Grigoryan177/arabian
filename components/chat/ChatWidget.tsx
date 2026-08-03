"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { ChatBubble, TypingBubble } from "./ChatBubble";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hello — I can help you find the right Arabic fragrance. What are you looking for? You can write in English, Հայերեն or Русский.",
};

const SUGGESTIONS = [
  "Something sweet for winter",
  "A gift for my wife",
  "Best long-lasting oud",
];

/**
 * On-site fragrance assistant. Talks to /api/chat, which calls DeepSeek
 * server-side. Conversation lives in component state only — no database,
 * no cookies; refreshing starts a fresh conversation.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        reply?: string;
        error?: string;
      };
      // Show the server's own message for rate limiting so the visitor is
      // told to wait rather than seeing a generic failure.
      if (res.status === 429 && data.error) {
        setMessages((m) => [...m, { role: "assistant", content: data.error! }]);
        return;
      }
      if (!res.ok || !data.reply) throw new Error("no reply");
      setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't reply just now. Please message @arabian_nights_arm on Instagram or use the contact form and the team will help you.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={
          open ? "Close fragrance assistant" : "Open fragrance assistant"
        }
        aria-expanded={open}
        className="fixed bottom-24 right-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black shadow-lg transition-transform hover:scale-105 sm:bottom-20 sm:right-6"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      <div
        role="dialog"
        aria-label="Fragrance assistant"
        className={cn(
          "fixed bottom-[9.5rem] right-4 z-[70] flex w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-border bg-black shadow-2xl transition-all duration-300 sm:bottom-[8.5rem] sm:right-6",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <div className="border-b border-border bg-surface px-4 py-3">
          <p className="font-display text-base text-warmwhite">
            Fragrance Assistant
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
            Arabian Nights
          </p>
        </div>

        <div
          ref={scrollRef}
          className="h-[320px] space-y-3 overflow-y-auto p-4"
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} content={m.content} />
          ))}
          {sending && <TypingBubble />}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border bg-surface p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a fragrance…"
            aria-label="Your message"
            maxLength={800}
            className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-black transition-opacity disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>

        <p className="border-t border-border bg-black px-3 py-2 text-[9px] leading-snug text-muted">
          AI assistant — for stock and delivery the team will confirm directly.
        </p>
      </div>
    </>
  );
}
