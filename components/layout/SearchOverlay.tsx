"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatAMD } from "@/lib/utils";

const DEFAULT_TAGS = ["Lattafa", "Oud", "Hayati", "Sweet", "Fresh", "Afnan"];

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKeyDown);
    // Lock body scroll while the overlay is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const matches =
    query.trim().length >= 1
      ? PRODUCTS.filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.type.toLowerCase().includes(q)
          );
        }).slice(0, 6)
      : [];

  function goToShop(term: string) {
    onOpenChange(false);
    router.push(`/shop?search=${encodeURIComponent(term)}`);
  }

  return (
    <div
      role="dialog"
      aria-label="Search fragrances"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex justify-center overflow-y-auto bg-black/80 px-6 pt-28 backdrop-blur-xl"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-[640px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center gap-4 rounded-lg border border-gold/40 bg-surface/95 px-5 py-4 shadow-2xl">
          <SearchIcon
            className="h-5 w-5 shrink-0 text-gold"
            aria-hidden="true"
          />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances..."
            aria-label="Search fragrances"
            className="flex-1 bg-transparent font-body text-lg text-warmwhite caret-gold outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close search"
            className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {matches.length > 0 ? (
          <ul className="overflow-hidden rounded-lg border border-border bg-surface/95 shadow-2xl">
            {matches.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    router.push(`/product/${p.id}`);
                  }}
                  className="flex w-full items-center justify-between gap-4 border-b border-border px-5 py-3.5 text-left transition-colors last:border-none hover:bg-surface2"
                >
                  <span>
                    <span className="block text-[15px] text-warmwhite">
                      {p.name}
                    </span>
                    <span className="block text-[11px] uppercase tracking-[0.15em] text-muted">
                      {p.brand} &middot; {p.type}
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-base text-gold">
                    {formatAMD(p.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim().length >= 1 ? (
          <p className="rounded-lg border border-border bg-surface/95 px-5 py-6 text-center text-sm text-muted">
            No fragrances match &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-muted">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => goToShop(tag)}
                  className="rounded-full border border-border bg-surface/80 px-4 py-2 text-[12px] text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
