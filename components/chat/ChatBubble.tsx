import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed",
          isUser
            ? "rounded-br-sm bg-gold text-black"
            : "rounded-bl-sm border border-border bg-surface2 text-ink"
        )}
      >
        {content}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex justify-start" aria-label="Assistant is typing">
      <div className="flex gap-1 rounded-lg rounded-bl-sm border border-border bg-surface2 px-4 py-3">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
