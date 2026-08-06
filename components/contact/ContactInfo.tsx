import { Instagram, Phone, MapPin, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ContactItemData {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
}

const ITEMS: ContactItemData[] = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@arabian_nights_arm",
    sub: "DM us for orders and consultations",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+374 XX XXX XXX",
    sub: "Every day, 10:00 – 22:00",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Yerevan, Armenia",
    sub: "Visit us in store \u2014 address on request",
  },
  {
    icon: Truck,
    label: "Delivery",
    value: "Available across Yerevan",
    sub: "Same-day and next-day options",
  },
];

export function ContactInfo() {
  return (
    <div>
      {ITEMS.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex items-start gap-4 py-6 ${i < ITEMS.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                {item.label}
              </p>
              <p className="text-[15px] text-warmwhite">{item.value}</p>
              <p className="text-xs text-muted">{item.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
