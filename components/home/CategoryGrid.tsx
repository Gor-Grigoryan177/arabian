"use client";

import Link from "next/link";
import { getCategoryCounts } from "@/lib/products";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTranslations } from "@/hooks/useLocale";

const CATEGORIES = [
  { key: "Men", icon: "\u2642", href: "/shop?gender=Men" },
  { key: "Women", icon: "\u2640", href: "/shop?gender=Women" },
  { key: "Unisex", icon: "\u25C8", href: "/shop?gender=Unisex" },
] as const;

const SCENT_CATEGORIES = [
  {
    name: "Sweet",
    icon: "\u2726",
    desc: "Rich & warm",
    href: "/shop?type=Sweet",
  },
  {
    name: "Fresh",
    icon: "\u274B",
    desc: "Light & airy",
    href: "/shop?type=Fresh",
  },
  {
    name: "Long Lasting",
    icon: "\u27C1",
    desc: "12+ hour wear",
    href: "/shop?type=Woody",
  },
];

export function CategoryGrid() {
  const t = useTranslations();
  const counts = getCategoryCounts();

  return (
    <section className="border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow={t.sections.browse}
          title={t.sections.shopByCategory}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className="group rounded-md border border-border bg-surface p-10 text-center transition-colors hover:border-gold-dim hover:bg-surface2"
            >
              <div
                className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              >
                {cat.icon}
              </div>
              <div className="mb-1 font-display text-lg text-warmwhite">
                {cat.key}
              </div>
              <div className="text-[10px] tracking-wide text-muted">
                {counts[cat.key]} fragrance{counts[cat.key] === 1 ? "" : "s"}
              </div>
            </Link>
          ))}
          {SCENT_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-md border border-border bg-surface p-10 text-center transition-colors hover:border-gold-dim hover:bg-surface2"
            >
              <div
                className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              >
                {cat.icon}
              </div>
              <div className="mb-1 font-display text-lg text-warmwhite">
                {cat.name}
              </div>
              <div className="text-[10px] tracking-wide text-muted">
                {cat.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
