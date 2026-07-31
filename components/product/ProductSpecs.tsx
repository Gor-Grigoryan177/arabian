import type { Product } from "@/types/product";

function SpecBar({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="rounded-sm border border-border bg-surface p-3.5">
      <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <p className="text-[13px] text-warmwhite">{value}</p>
      <div className="mt-1.5 h-[3px] rounded-full bg-border">
        <div
          className="h-full rounded-full bg-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SpecStatic({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-surface p-3.5">
      <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <p className="text-[13px] text-warmwhite">{value}</p>
    </div>
  );
}

export function ProductSpecs({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SpecBar
        label="Longevity"
        value={product.longevity}
        pct={product.longevityPct}
      />
      <SpecBar
        label="Projection"
        value={product.projection}
        pct={product.projectionPct}
      />
      <SpecStatic label="Best Season" value={product.season} />
      <SpecStatic label="Best For" value={product.occasion} />
    </div>
  );
}
