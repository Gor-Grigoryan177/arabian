import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopResults } from "@/components/shop/ShopResults";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse authentic Arabic perfumes from Lattafa, Hayati, Afnan and Ard Al Zaafaran. Filter by category, brand, price and scent type.",
};

export default function ShopPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1280px] px-6 pt-10">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
          Our Collection
        </p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-warmwhite">
          Shop All Fragrances
        </h1>
        <div className="mt-5 h-px w-12 bg-gold" />
      </div>
      <Suspense
        fallback={
          <div className="px-6 py-10 text-center text-muted">
            Loading&hellip;
          </div>
        }
      >
        <ShopResults />
      </Suspense>
    </div>
  );
}
