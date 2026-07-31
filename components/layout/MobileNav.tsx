"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ open, onOpenChange, links }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-label="Mobile navigation">
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="border-b border-border py-3 font-display text-[40px] font-light text-muted transition-colors hover:text-warmwhite"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher className="mt-8" />
      </SheetContent>
    </Sheet>
  );
}
