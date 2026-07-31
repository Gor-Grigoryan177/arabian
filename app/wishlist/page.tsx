import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Your Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
        Saved
      </p>
      <h1 className="mb-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-warmwhite">
        Your Wishlist
      </h1>
      <div className="mb-8 h-px w-12 bg-gold" />
      <WishlistView />
    </div>
  );
}
