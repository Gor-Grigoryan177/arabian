"use client";

import { ProductImage } from "@/components/shared/ProductImage";
import { getShowcaseProduct } from "@/lib/products";

export function AboutBottleShowcase() {
  const product = getShowcaseProduct();
  if (!product) return null;

  return (
    <div className="relative h-[360px] overflow-hidden rounded-md border border-border bg-surface sm:h-[480px]">
      {/* Warm pool of light behind the bottle so it reads as a lit product
          shot rather than an object floating on a flat panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(200,150,60,0.16) 0%, rgba(120,80,25,0.07) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
        }}
      />

      <ProductImage
        product={product}
        sizes="(max-width: 1024px) 100vw, 600px"
        className="relative h-full w-full object-contain p-8"
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-sm border border-gold/25 bg-black/60 px-5 py-2.5 text-center backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
          {product.brand}
        </p>
        <p className="font-display text-base text-warmwhite">{product.name}</p>
        <p className="text-[10px] text-muted">EDP &middot; {product.size}</p>
      </div>
    </div>
  );
}
