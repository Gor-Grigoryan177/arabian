"use client";

import { useState } from "react";
import { Heart, Instagram, Phone } from "lucide-react";
import type { Product } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useOrderModal } from "@/hooks/useOrderModal";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Button } from "@/components/ui/button";
import { formatAMD, cn } from "@/lib/utils";

const SIZES = ["50ml", "100ml", "Gift Box"];

export function ProductPurchasePanel({ product }: { product: Product }) {
  const mounted = useHasMounted();
  const isWishlisted = useWishlist((s) => s.has(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const openOrder = useOrderModal((s) => s.open);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);

  return (
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
        {product.brand}
      </p>
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="font-display text-[clamp(2rem,3vw,3rem)] font-light leading-[1.1] text-warmwhite">
          {product.name}
        </h1>
        <button
          type="button"
          aria-label={
            mounted && isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-gold",
            mounted && isWishlisted && "border-gold text-gold"
          )}
        >
          <Heart
            className="h-4 w-4"
            fill={mounted && isWishlisted ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-display text-[36px] text-gold">
          {formatAMD(product.price)}
        </span>
      </div>

      <div className="mb-7">
        <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-muted">
          Select Size
        </p>
        <div className="flex gap-2.5">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "rounded-sm border border-border px-5 py-2 text-xs text-muted transition-colors hover:border-gold hover:text-gold",
                selectedSize === size && "border-gold text-gold"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-2.5">
        <Button
          onClick={() => openOrder(product.name)}
          className="justify-center"
        >
          Order Now
        </Button>
        <a
          href="https://instagram.com/arabian_nights_arm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-sm border border-border py-3.5 text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-[#c13584] hover:text-[#c13584]"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Order via Instagram
        </a>
        <a
          href="tel:+37400000000"
          className="flex items-center justify-center gap-2 rounded-sm border border-border py-3.5 text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-gold-dim hover:text-gold"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call to Order
        </a>
      </div>
    </div>
  );
}
