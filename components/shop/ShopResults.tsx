"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ShopFilters } from "./ShopFilters";
import { ShopSearch } from "./ShopSearch";
import { ProductGrid } from "@/components/product/ProductGrid";
import type {
  ShopFilterState,
  Gender,
  Brand,
  ScentType,
} from "@/types/product";

const DEFAULT_FILTERS: ShopFilterState = {
  genders: [],
  brands: [],
  types: [],
  maxPrice: 40000,
  search: "",
};

/**
 * Client-side shop experience: reads initial filters from the URL (so
 * links like /shop?gender=Men or /shop?search=Oud from other pages work),
 * then manages filtering entirely in memory — no full page reload needed
 * as the user adjusts filters.
 */
export function ShopResults() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ShopFilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    const gender = searchParams.get("gender") as Gender | null;
    const brand = searchParams.get("brand") as Brand | null;
    const type = searchParams.get("type") as ScentType | null;
    const search = searchParams.get("search");

    setFilters((prev) => ({
      ...prev,
      genders: gender ? [gender] : prev.genders,
      brands: brand ? [brand] : prev.brands,
      types: type ? [type] : prev.types,
      search: search ?? prev.search,
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const genderOk =
        filters.genders.length === 0 || filters.genders.includes(p.gender);
      const brandOk =
        filters.brands.length === 0 || filters.brands.includes(p.brand);
      const typeOk =
        filters.types.length === 0 || filters.types.includes(p.type);
      const priceOk = p.price <= filters.maxPrice;
      const q = filters.search.toLowerCase();
      const searchOk =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      return genderOk && brandOk && typeOk && priceOk && searchOk;
    });
  }, [filters]);

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:gap-10 lg:py-10">
      <div className="order-2 lg:order-1">
        <ShopFilters filters={filters} onChange={setFilters} />
      </div>
      <div className="order-1 lg:order-2">
        <ShopSearch
          value={filters.search}
          onChange={(search) => setFilters((f) => ({ ...f, search }))}
          resultCount={filtered.length}
        />
        <ProductGrid
          products={filtered}
          emptyMessage="No fragrances match your filters."
        />
      </div>
    </div>
  );
}
