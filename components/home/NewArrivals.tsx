"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { getNewArrivals } from "@/lib/products";
import Link from "next/link";
import { useTranslations } from "@/hooks/useLocale";

export function NewArrivals() {
  const t = useTranslations();
  const products = getNewArrivals();
  return (
    <section className="border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Just Arrived"
            title="New Arrivals"
            className="mb-0"
          />
          <Button asChild variant="outline">
            <Link href="/shop">{t.sections.shopNew}</Link>
          </Button>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
