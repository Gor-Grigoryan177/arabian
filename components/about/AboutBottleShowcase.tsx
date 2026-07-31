"use client";

import { BottleCanvas } from "@/components/shared/BottleCanvas";
import { getProductById } from "@/lib/products";

export function AboutBottleShowcase() {
  const khamrah = getProductById(1);

  return (
    <div className="relative h-[360px] overflow-hidden rounded-md border border-border bg-surface bg-[radial-gradient(ellipse_at_60%_40%,rgba(200,169,110,0.08)_0%,transparent_65%)] sm:h-[480px]">
      {khamrah && (
        <BottleCanvas
          product={khamrah}
          arabicName="خمرة"
          ariaLabel="Khamrah by Lattafa bottle render"
          className="h-full w-full"
        />
      )}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-sm border border-gold/30 bg-black/70 px-5 py-3 text-center backdrop-blur-sm">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
          Lattafa
        </p>
        <p className="font-display text-base text-warmwhite">Khamrah</p>
        <p className="text-[10px] text-muted">EDP &middot; 100ml</p>
      </div>
    </div>
  );
}
