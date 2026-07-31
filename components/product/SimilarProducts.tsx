import type { Product } from "@/types/product";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductGrid } from "./ProductGrid";
import { getSimilarProducts } from "@/lib/products";

export function SimilarProducts({ product }: { product: Product }) {
  const similar = getSimilarProducts(product);
  if (similar.length === 0) return null;

  return (
    <section className="border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader eyebrow="You May Also Like" title="Similar Fragrances" />
        <ProductGrid products={similar} />
      </div>
    </section>
  );
}
