"use client";

import { ProductImage } from "@/components/shared/ProductImage";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative mb-3 h-[340px] overflow-hidden rounded-md border border-border bg-surface sm:h-[480px]">
      <ProductImage
        product={product}
        sizes="(max-width: 1024px) 100vw, 600px"
        priority
        className="object-contain p-6 transition-transform duration-500 hover:scale-[1.04]"
      />
    </div>
  );
}
