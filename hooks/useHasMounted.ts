"use client";

import { useEffect, useState } from "react";

/**
 * Guards against SSR/client hydration mismatches for state that reads
 * from localStorage (e.g. zustand persist stores).
 */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
