"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-40 right-4 z-[56] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-300 hover:border-gold hover:text-gold sm:bottom-36 sm:right-6",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      )}
    >
      <ChevronUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
