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
    </div>
  );
}
