"use client";

import { LOCALES } from "@/lib/i18n/dictionaries";
import { useLocaleStore } from "@/hooks/useLocale";
import { useHasMounted } from "@/hooks/useHasMounted";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const mounted = useHasMounted();
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="group"
      aria-label="Select language"
    >
      {LOCALES.map((l) => {
        const active = mounted && locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={active}
            aria-label={`Switch to ${l.name}`}
            className={cn(
              "rounded-sm border px-2 py-1 text-[10px] uppercase tracking-[0.2em] transition-colors",
              active
                ? "border-gold text-gold"
                : "border-border text-muted hover:border-gold-dim hover:text-gold"
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
