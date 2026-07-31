"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroBottleScene } from "./HeroBottleScene";
import { useTranslations } from "@/hooks/useLocale";

export function Hero() {
  const t = useTranslations();

  const STATS = [
    { value: "200+", label: t.stats.fragrances },
    { value: "4", label: t.stats.brands },
    { value: "100%", label: t.stats.authentic },
  ];

  return (
    <section className="relative flex min-h-[85vh] w-full max-w-full flex-col overflow-x-hidden md:min-h-[90vh]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 68% 50%, rgba(180,120,30,0.22) 0%, rgba(120,70,10,0.12) 35%, rgba(20,16,10,0.95) 70%, #0f0d09 100%), radial-gradient(ellipse 40% 60% at 20% 40%, rgba(200,140,40,0.08) 0%, transparent 60%), linear-gradient(160deg, #13110d 0%, #1a1610 40%, #100e0a 100%)",
        }}
      />

      <div className="relative z-[3] mx-auto flex w-full max-w-[1280px] flex-1 items-center gap-0 px-5 py-10 sm:px-6 md:px-12 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-[560px] flex-1"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(2.2rem,8vw,4.5rem)] font-light leading-[1.08] text-warmwhite">
            Discover your{" "}
            <em className="italic not-italic text-gold">signature</em> Arabic
            fragrance
          </h1>

          <p className="mb-10 max-w-[400px] text-sm tracking-wide text-muted">
            Premium oriental perfumes, delivered across Armenia. Lattafa,
            Hayati, Afnan and more &mdash; authentic, direct from the source.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/shop">{t.hero.shopCta}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#quiz">{t.hero.quizCta}</Link>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-8 border-t border-border pt-5">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="animate-shimmer bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_auto] bg-clip-text font-display text-[28px] leading-none text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <HeroBottleScene />
      </div>

      <div className="relative z-[3] flex flex-col items-center gap-2 pb-5 text-[9px] uppercase tracking-[0.3em] text-muted">
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        {t.hero.scroll}
      </div>
    </section>
  );
}
