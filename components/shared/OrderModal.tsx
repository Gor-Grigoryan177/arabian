"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrderModal } from "@/hooks/useOrderModal";
import { phoneErrorMessage } from "@/lib/validation";

/**
 * Simple order-intent form (no live checkout by design — this is a local
 * Armenian retailer; real fulfilment happens over phone/Instagram/DM).
 * Validates client-side and shows a success toast; wire the onSubmit
 * handler to a real backend/webhook when ready to go live.
 */
export function OrderModal() {
  const { isOpen, productName, close } = useOrderModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  function reset() {
    setName("");
    setPhone("");
    setQuantity(1);
    setNameError(null);
    setPhoneError(null);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      close();
      reset();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nErr = name.trim() ? null : "Please enter your name";
    const pErr = phoneErrorMessage(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    if (nErr || pErr) return;

    close();
    reset();
    toast.success(
      `Order received — we'll contact you shortly about ${productName ?? "your order"}!`
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
          Place Your Order
        </p>
        <DialogTitle>Order Now</DialogTitle>
        <DialogDescription>
          We&apos;ll confirm and arrange delivery in Yerevan
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="order-name">Full Name</Label>
            <Input
              id="order-name"
              value={name}
              invalid={!!nameError}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(null);
              }}
              placeholder="Your name"
              aria-describedby="order-name-error"
            />
            {nameError && (
              <p
                id="order-name-error"
                role="alert"
                className="mt-1.5 text-[11px] text-[#d97066]"
              >
                &#9888; {nameError}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="order-phone">Phone Number</Label>
            <Input
              id="order-phone"
              type="tel"
              value={phone}
              invalid={!!phoneError}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(
                  phoneErrorMessage(e.target.value) && e.target.value
                    ? phoneErrorMessage(e.target.value)
                    : null
                );
              }}
              placeholder="+374 XX XXX XXX"
              aria-describedby="order-phone-error"
            />
            {phoneError && (
              <p
                id="order-phone-error"
                role="alert"
                className="mt-1.5 text-[11px] text-[#d97066]"
              >
                &#9888; {phoneError}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="order-product">Product</Label>
            <Input id="order-product" value={productName ?? ""} readOnly />
          </div>

          <div>
            <Label htmlFor="order-qty">Quantity</Label>
            <Input
              id="order-qty"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <Button type="submit" className="mt-2 w-full justify-center">
            Confirm Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
