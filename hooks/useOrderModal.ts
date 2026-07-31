"use client";

import { create } from "zustand";

interface OrderModalState {
  isOpen: boolean;
  productName: string | null;
  open: (productName?: string) => void;
  close: () => void;
}

export const useOrderModal = create<OrderModalState>((set) => ({
  isOpen: false,
  productName: null,
  open: (productName) =>
    set({ isOpen: true, productName: productName ?? null }),
  close: () => set({ isOpen: false }),
}));
