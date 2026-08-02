"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useOrderModal } from "@/hooks/useOrderModal";
import { phoneErrorMessage } from "@/lib/validation";
import { EMPTY_ORDER, type OrderDraft } from "@/types/order";
import { OrderForm, type OrderErrors } from "./OrderForm";
import { OrderReview } from "./OrderReview";

/**
 * Two-step order flow: fill in details -> review summary -> send.
 *
 * No payment is taken here by design. This is a local Armenian retailer:
 * the shop calls to confirm, then takes cash on delivery or a bank
 * transfer. The order is submitted to /api/order, which relays it to n8n
 * server-side (Google Sheet + Telegram notification).
 */
export function OrderModal() {
  const { isOpen, product, close } = useOrderModal();
  const [step, setStep] = useState<"form" | "review">("form");
  const [draft, setDraft] = useState<OrderDraft>(EMPTY_ORDER);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setStep("form");
    setDraft(EMPTY_ORDER);
    setErrors({});
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      close();
      reset();
    }
  }

  function patch(update: Partial<OrderDraft>) {
    setDraft((d) => ({ ...d, ...update }));
    // Clear the error for any field the user is actively fixing.
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(update) as (keyof OrderDraft)[])
        delete next[key];
      return next;
    });
  }

  function handleReview(e: React.FormEvent) {
    e.preventDefault();
    const next: OrderErrors = {};
    if (!draft.name.trim()) next.name = "Please enter your name";
    const phoneErr = phoneErrorMessage(draft.phone);
    if (phoneErr) next.phone = phoneErr;
    if (!draft.address.trim()) next.address = "Please enter a delivery address";

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStep("review");
  }

  async function handleConfirm() {
    if (!product) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          name: draft.name.trim(),
          phone: draft.phone.trim(),
          address: draft.address.trim(),
          product: product.name,
          brand: product.brand,
          size: product.size,
          unitPrice: product.price,
          total: product.price * draft.quantity,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      close();
      reset();
      toast.success(
        `Order received — we'll call you shortly about ${product.name}!`
      );
    } catch {
      // Never let the customer believe an order went through when it did not.
      toast.error(
        "We couldn't send your order. Please call or message us on Instagram instead."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
          {step === "form" ? "Your Details" : "Confirm Your Order"}
        </p>
        <DialogTitle>
          {step === "form" ? "Order Now" : "Review Order"}
        </DialogTitle>
        <DialogDescription>
          {step === "form"
            ? "We'll confirm by phone and arrange delivery"
            : "Please check everything is correct"}
        </DialogDescription>

        {step === "form" ? (
          <OrderForm
            draft={draft}
            errors={errors}
            onChange={patch}
            onSubmit={handleReview}
          />
        ) : product ? (
          <OrderReview
            product={product}
            draft={draft}
            submitting={submitting}
            onBack={() => setStep("form")}
            onConfirm={handleConfirm}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
