"use client";

import Link from "next/link";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useHasMounted } from "@/hooks/useHasMounted";
import { PRODUCTS } from "@/lib/products";
import { formatAMD, cn } from "@/lib/utils";

export function RecentlyViewedBar() {
  const mounted = useHasMounted();
  const ids = useRecentlyViewed((s) => s.ids);

  if (!mounted || ids.length === 0) return null;

  const items = ids
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[55] flex items-center gap-3 border-t border-border bg-surface/[0.97] px-4 py-2.5 backdrop-blur-md transition-transform sm:gap-4 sm:px-6 sm:py-3"
      )}
    >
      <span className="hidden whitespace-nowrap text-[9px] uppercase tracking-[0.25em] text-gold sm:block">
        Recently Viewed
      </span>
      <div className="scrollbar-none flex gap-2.5 overflow-x-auto sm:gap-3">
        {items.map((p) =>
          p ? (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-sm border border-border bg-surface px-3 py-1.5 transition-colors hover:border-gold-dim"
            >
              <span className="text-[11px] text-warmwhite">{p.name}</span>
              <span className="text-[10px] text-gold">
                {formatAMD(p.price)}
              </span>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
