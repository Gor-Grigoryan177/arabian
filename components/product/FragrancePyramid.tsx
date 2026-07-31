import type { FragranceNotes } from "@/types/product";

export function FragrancePyramid({ notes }: { notes: FragranceNotes }) {
  const rows: { label: string; value: string }[] = [
    { label: "Top Notes", value: notes.top },
    { label: "Heart Notes", value: notes.heart },
    { label: "Base Notes", value: notes.base },
  ];

  return (
    <div className="mb-6 rounded-md border border-border bg-surface p-7">
      <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-gold">
        Fragrance Pyramid
      </p>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted">
              {row.label}
            </p>
            <p className="font-display text-base text-warmwhite">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
