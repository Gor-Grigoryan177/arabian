"use client";

import { create } from "zustand";
import type { Product } from "@/types/product";

interface OrderModalState {
  isOpen: boolean;
  /** Full product so the review step can show brand, size and total. */
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

export const useOrderModal = create<OrderModalState>((set) => ({
  isOpen: false,
  product: null,
  open: (product) => set({ isOpen: true, product }),
  close: () => set({ isOpen: false }),
}));
