"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PAYMENT_LABELS,
  type OrderDraft,
  type PaymentMethod,
} from "@/types/order";

export type OrderErrors = Partial<Record<keyof OrderDraft, string>>;

interface OrderFormProps {
  draft: OrderDraft;
  errors: OrderErrors;
  onChange: (patch: Partial<OrderDraft>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** Step 1 — collect the customer's details. */
export function OrderForm({
  draft,
  errors,
  onChange,
  onSubmit,
}: OrderFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field id="order-name" label="Full Name" error={errors.name}>
        <Input
          id="order-name"
          value={draft.name}
          invalid={!!errors.name}
          autoComplete="name"
          placeholder="Your name"
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </Field>

      <Field id="order-phone" label="Phone Number" error={errors.phone}>
        <Input
          id="order-phone"
          type="tel"
          value={draft.phone}
          invalid={!!errors.phone}
          autoComplete="tel"
          placeholder="+374 XX XXX XXX"
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </Field>

      <Field id="order-address" label="Delivery Address" error={errors.address}>
        <Input
          id="order-address"
          value={draft.address}
          invalid={!!errors.address}
          autoComplete="street-address"
          placeholder="Street, building, apartment"
          onChange={(e) => onChange({ address: e.target.value })}
        />
      </Field>

      <Field id="order-city" label="City">
        <Input
          id="order-city"
          value={draft.city}
          autoComplete="address-level2"
          onChange={(e) => onChange({ city: e.target.value })}
        />
      </Field>

      <div>
        <p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
          Payment
        </p>
        <div className="flex gap-2.5">
          {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((method) => (
            <button
              key={method}
              type="button"
              aria-pressed={draft.paymentMethod === method}
              onClick={() => onChange({ paymentMethod: method })}
              className={cn(
                "flex-1 rounded-sm border border-border px-3 py-2.5 text-[11px] text-muted transition-colors hover:border-gold hover:text-gold",
                draft.paymentMethod === method &&
                  "border-gold bg-gold/[0.06] text-gold"
              )}
            >
              {PAYMENT_LABELS[method]}
            </button>
          ))}
        </div>
      </div>

      <Field id="order-qty" label="Quantity">
        <Input
          id="order-qty"
          type="number"
          min={1}
          max={10}
          value={draft.quantity}
          onChange={(e) =>
            onChange({ quantity: Math.max(1, Number(e.target.value) || 1) })
          }
        />
      </Field>

      <Field id="order-note" label="Note (optional)">
        <Textarea
          id="order-note"
          rows={2}
          value={draft.note}
          placeholder="Anything we should know?"
          onChange={(e) => onChange({ note: e.target.value })}
        />
      </Field>

      <Button type="submit" className="mt-2 w-full justify-center">
        Review Order
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[11px] text-[#d97066]">
          &#9888; {error}
        </p>
      )}
    </div>
  );
}
