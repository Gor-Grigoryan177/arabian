"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useHasMounted } from "@/hooks/useHasMounted";
import { SearchOverlay } from "./SearchOverlay";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "@/hooks/useLocale";

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useHasMounted();
  const wishlistCount = useWishlist((s) => s.ids.length);
  const t = useTranslations();

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[68px] border-b border-border bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
          <Link href="/" className="flex select-none flex-col">
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-gold">
              &#1604;&#1610;&#1575;&#1604;&#1610;
              &#1575;&#1604;&#1593;&#1585;&#1576;
            </span>
            <span className="whitespace-nowrap font-display text-[19px] leading-[1.1] tracking-wide text-warmwhite sm:text-[22px]">
              Arabian Nights
            </span>
            <span className="mt-px hidden whitespace-nowrap text-[8px] uppercase tracking-[0.35em] text-muted sm:block">
              Premium Arabic Perfumes &middot; Armenia
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-muted hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t.common.search}
              className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <Link
              href="/wishlist"
              aria-label={
                mounted ? `Wishlist (${wishlistCount} items)` : "Wishlist"
              }
              className="relative flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
            >
              <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-semibold text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <LanguageSwitcher className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        links={NAV_LINKS}
      />
    </>
  );
}
