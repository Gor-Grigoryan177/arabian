"use client";

import { Button } from "@/components/ui/button";
import { formatAMD } from "@/lib/utils";
import { PAYMENT_LABELS, type OrderDraft } from "@/types/order";
import type { Product } from "@/types/product";

interface OrderReviewProps {
  product: Product;
  draft: OrderDraft;
  submitting: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

/**
 * Step 2 — show exactly what is being ordered before it is sent.
 * Catches wrong quantity / typo'd phone before the shop has to phone back,
 * and makes the submission feel like a real purchase rather than a form.
 */
export function OrderReview({
  product,
  draft,
  submitting,
  onBack,
  onConfirm,
}: OrderReviewProps) {
  const total = product.price * draft.quantity;

  return (
    <div>
      <div className="mb-5 rounded-md border border-border bg-surface2 p-4">
        <p className="text-[9px] uppercase tracking-[0.25em] text-gold">
          {product.brand}
        </p>
        <p className="font-display text-xl text-warmwhite">{product.name}</p>
        <p className="text-[11px] text-muted">
          {product.size} &middot; {product.type}
        </p>

        <div className="mt-3 space-y-1 border-t border-border pt-3 text-[13px]">
          <Row
            label={`${formatAMD(product.price)} × ${draft.quantity}`}
            value=""
            muted
          />
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
              Total
            </span>
            <span className="font-display text-2xl text-gold">
              {formatAMD(total)}
            </span>
          </div>
        </div>
      </div>

      <dl className="mb-6 space-y-2 text-[13px]">
        <Row label="Name" value={draft.name} />
        <Row label="Phone" value={draft.phone} />
        <Row label="Address" value={`${draft.address}, ${draft.city}`} />
        <Row label="Payment" value={PAYMENT_LABELS[draft.paymentMethod]} />
        {draft.note.trim() && <Row label="Note" value={draft.note} />}
      </dl>

      <p className="mb-4 text-[11px] leading-relaxed text-muted">
        No payment is taken now. We&apos;ll call you to confirm the order and
        arrange delivery.
      </p>

      <div className="flex gap-2.5">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={submitting}
          className="flex-1 justify-center"
        >
          Back
        </Button>
        <Button
          onClick={onConfirm}
          disabled={submitting}
          className="flex-[2] justify-center disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt
        className={
          muted
            ? "text-muted"
            : "text-[10px] uppercase tracking-[0.2em] text-muted"
        }
      >
        {label}
      </dt>
      <dd className="text-right text-warmwhite">{value}</dd>
    </div>
  );
}
