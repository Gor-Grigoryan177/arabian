"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_ITEMS = 6;

interface RecentlyViewedState {
  ids: number[];
  add: (id: number) => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      ids: [],
      add: (id) =>
        set((state) => ({
          ids: [id, ...state.ids.filter((x) => x !== id)].slice(0, MAX_ITEMS),
        })),
    }),
    { name: "arabian-nights-recently-viewed" }
  )
);
