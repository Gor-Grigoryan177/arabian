"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BRANDS, GENDERS, SCENT_TYPES } from "@/lib/products";
import { formatAMD } from "@/lib/utils";
import type { ShopFilterState } from "@/types/product";

interface ShopFiltersProps {
  filters: ShopFilterState;
  onChange: (filters: ShopFilterState) => void;
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function ShopFilters({ filters, onChange }: ShopFiltersProps) {
  return (
    <aside className="rounded-md border border-border p-4 lg:sticky lg:top-[88px] lg:self-start lg:border-0 lg:p-0">
      <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold lg:hidden">
        Filters
      </p>
      <FilterGroup title="Category">
        {GENDERS.map((g) => (
          <FilterCheckbox
            key={g}
            id={`gender-${g}`}
            label={g}
            checked={filters.genders.includes(g)}
            onChange={() =>
              onChange({ ...filters, genders: toggleValue(filters.genders, g) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {BRANDS.map((b) => (
          <FilterCheckbox
            key={b}
            id={`brand-${b}`}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() =>
              onChange({ ...filters, brands: toggleValue(filters.brands, b) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range (AMD)">
        <Slider
          min={6500}
          max={40000}
          step={500}
          value={[filters.maxPrice]}
          onValueChange={([v]) =>
            onChange({ ...filters, maxPrice: v ?? 40000 })
          }
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>{formatAMD(6500)}</span>
          <span>{formatAMD(filters.maxPrice)}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Fragrance Type">
        {SCENT_TYPES.map((t) => (
          <FilterCheckbox
            key={t}
            id={`type-${t}`}
            label={t}
            checked={filters.types.includes(t)}
            onChange={() =>
              onChange({ ...filters, types: toggleValue(filters.types, t) })
            }
          />
        ))}
      </FilterGroup>

      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={() =>
          onChange({
            genders: [],
            brands: [],
            types: [],
            maxPrice: 40000,
            search: filters.search,
          })
        }
      >
        Clear Filters
      </Button>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 border-b border-border pb-6 last-of-type:border-none">
      <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label
        htmlFor={id}
        className="mb-0 cursor-pointer text-[13px] normal-case tracking-normal text-muted hover:text-warmwhite"
      >
        {label}
      </Label>
    </div>
  );
}
