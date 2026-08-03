import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

/**
 * The model emphasises product names with Markdown bold. Rendering it is
 * better than stripping it — the perfume name is the useful part of the
 * answer — but only **bold** is supported, so no untrusted HTML is ever
 * inserted.
 */
function renderContent(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-medium text-gold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed",
          isUser
            ? "rounded-br-sm bg-gold font-medium text-black"
            : "rounded-bl-sm border border-border bg-surface2 text-ink"
        )}
      >
        {isUser ? content : renderContent(content)}
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
