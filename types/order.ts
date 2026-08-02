export type PaymentMethod = "cash" | "transfer";

/**
 * Order lifecycle. Deliberately does NOT include "pending" — that implies
 * waiting on a payment processor. This shop takes cash on delivery or bank
 * transfer, so the meaningful states are about contact and delivery.
 */
export type OrderStatus =
  | "NEW" // received, shop has not contacted the customer yet
  | "CONFIRMED" // shop called, customer confirmed
  | "DELIVERING" // out for delivery
  | "COMPLETED" // delivered and paid
  | "CANCELLED"; // customer cancelled or unreachable

export interface OrderDraft {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  quantity: number;
  note: string;
}

export const EMPTY_ORDER: OrderDraft = {
  name: "",
  phone: "",
  address: "",
  city: "Yerevan",
  paymentMethod: "cash",
  quantity: 1,
  note: "",
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash: "Cash on delivery",
  transfer: "Bank transfer",
};
