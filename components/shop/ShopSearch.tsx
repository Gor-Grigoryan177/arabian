"use client";

import { Search } from "lucide-react";

interface ShopSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function ShopSearch({ value, onChange, resultCount }: ShopSearchProps) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
      <div className="flex max-w-[360px] flex-1 items-center gap-2.5 rounded-sm border border-border bg-surface px-4 py-2.5 focus-within:border-gold-dim">
        <Search className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, brand, scent&hellip;"
          aria-label="Search fragrances"
          className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
        />
      </div>
      <p className="text-xs text-muted">
        {resultCount} fragrance{resultCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
