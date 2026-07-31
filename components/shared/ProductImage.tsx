"use client";

import Image from "next/image";
import { BottleCanvas } from "./BottleCanvas";
import type { Product } from "@/types/product";

interface ProductImageProps {
  product: Product;
  /** Rendered sizes hint for next/image responsive loading. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Single source of truth for how a product is displayed.
 *
 * If the product has a real photo it is rendered through next/image
 * (optimised, lazy-loaded, responsive). Otherwise it falls back to the
 * generated bottle illustration. This means real photography can be added
 * one product at a time by setting `image` in lib/products-data.ts —
 * no component changes required.
 */
export function ProductImage({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px",
  priority = false,
  className,
}: ProductImageProps) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} by ${product.brand}`}
        fill
        sizes={sizes}
        priority={priority}
        className={className ?? "object-contain p-4"}
      />
    );
  }

  return (
    <BottleCanvas
      product={product}
      className={className ?? "h-full w-full"}
      ariaLabel={`${product.name} by ${product.brand}`}
    />
  );
}
