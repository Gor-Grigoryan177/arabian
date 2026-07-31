const STATS = [
  { value: "200+", label: "Fragrances" },
  { value: "4", label: "Luxury Brands" },
  { value: "100%", label: "Authentic" },
];

export function AboutStats() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-12">
      <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-md border border-border">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-surface p-8 text-center">
            <div className="font-display text-4xl leading-none text-gold">
              {stat.value}
            </div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
