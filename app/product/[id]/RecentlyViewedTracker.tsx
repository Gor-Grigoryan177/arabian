"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

/**
 * Fires once on mount to record the product as recently viewed.
 * Kept separate from the (server) product page component since it needs
 * client-side state.
 */
export function RecentlyViewedTracker({ productId }: { productId: number }) {
  const add = useRecentlyViewed((s) => s.add);

  useEffect(() => {
    add(productId);
  }, [productId, add]);

  return null;
}
