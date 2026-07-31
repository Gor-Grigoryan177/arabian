const ITEMS = [
  "Lattafa",
  "Hayati",
  "Afnan",
  "Ard Al Zaafaran",
  "Premium Oriental",
  "Authentic Arabic",
  "Armenia",
];

export function BrandTicker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden border-y border-border bg-deep py-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-ticker gap-16">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 whitespace-nowrap font-display text-sm uppercase tracking-[0.25em] text-gold-dim"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}
