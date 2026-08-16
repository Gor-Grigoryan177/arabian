"use client";

import { ShieldCheck, Sparkles, Truck, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTranslations } from "@/hooks/useLocale";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Authentic Arabic",
    desc: "Every perfume sourced directly from the finest Arabic fragrance houses — Lattafa, Afnan, Hayati and more.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "We carry only genuine, sealed products. No imitations, no compromise.",
  },
  {
    icon: Truck,
    title: "Fast Armenia Delivery",
    desc: "Same-day and next-day delivery across Armenia. Order before 14:00, receive today.",
  },
  {
    icon: MessageCircle,
    title: "Personal Consultation",
    desc: "Not sure which scent is yours? Contact us on Instagram — we'll guide you to your signature fragrance.",
  },
];

export function WhyChooseUs() {
  const t = useTranslations();
  return (
    <section className="border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow={t.sections.ourPromise}
          title={t.sections.whyChooseUs}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-md border border-gold/10 bg-gradient-to-br from-surface2/80 to-surface/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(200,169,110,0.08)]"
              >
                <Icon
                  className="mb-4 h-7 w-7 text-gold transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-display text-lg text-warmwhite">
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
