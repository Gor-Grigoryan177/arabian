"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useHasMounted } from "./useHasMounted";
import {
  DICTIONARIES,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/dictionaries";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "arabian-nights-locale" }
  )
);

/**
 * Returns the active dictionary.
 *
 * The locale is persisted to localStorage, so the server always renders
 * English while the browser may restore a different language. Returning
 * English until after mount keeps the first client render identical to
 * the server HTML (avoiding a React hydration mismatch); the real locale
 * is applied on the next render.
 */
export function useTranslations(): Dictionary {
  const mounted = useHasMounted();
  const locale = useLocaleStore((s) => s.locale);
  if (!mounted) return DICTIONARIES.en;
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}
