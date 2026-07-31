"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useHasMounted } from "@/hooks/useHasMounted";
import { PRODUCTS } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

export function WishlistView() {
  const mounted = useHasMounted();
  const ids = useWishlist((s) => s.ids);

  if (!mounted) return null;

  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-muted">
        <Heart className="mx-auto mb-4 h-10 w-10" aria-hidden="true" />
        <p className="mb-2 font-display text-2xl text-warmwhite">
          Your wishlist is empty
        </p>
        <p className="mb-6">
          Save fragrances you love to find them easily later.
        </p>
        <Button asChild variant="outline">
          <Link href="/shop">Browse Fragrances</Link>
        </Button>
      </div>
    );
  }

  return <ProductGrid products={items} />;
}
