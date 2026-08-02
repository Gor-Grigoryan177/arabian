"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductImage } from "@/components/shared/ProductImage";
import { StarRating } from "@/components/shared/StarRating";
import { useWishlist } from "@/hooks/useWishlist";
import { useOrderModal } from "@/hooks/useOrderModal";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatAMD, cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/useLocale";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mounted = useHasMounted();
  const isWishlisted = useWishlist((s) => s.has(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const openOrder = useOrderModal((s) => s.open);
  const t = useTranslations();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-md border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold-dim hover:shadow-[0_0_40px_rgba(200,169,110,0.12)]"
    >
      <Link
        href={`/product/${product.id}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        <div className="relative h-[180px] overflow-hidden bg-surface2 sm:h-[260px]">
          <ProductImage product={product} />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-black">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-3 sm:p-5">
          <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-gold">
            {product.brand}
          </p>
          <h3 className="mb-1 font-display text-base leading-tight text-warmwhite sm:text-lg">
            {product.name}
          </h3>
          <p className="mb-3 text-[11px] text-muted">
            {product.gender} &middot; {product.type} &middot; {product.size}
          </p>
          <div className="mb-3">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-display text-[17px] text-gold sm:text-[22px]">
              {formatAMD(product.price)}
            </span>
            <button
              type="button"
              aria-label={`Order ${product.name}`}
              onClick={(e) => {
                e.preventDefault();
                openOrder(product);
              }}
              className="rounded-sm bg-gold px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.15em] text-black transition-colors hover:bg-gold-light"
            >
              {t.common.order}
            </button>
          </div>
        </div>
      </Link>

      <button
        type="button"
        role="button"
        aria-label={
          mounted && isWishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={cn(
          "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-muted transition-colors hover:text-gold",
          mounted && isWishlisted && "text-gold"
        )}
      >
        <Heart
          className="h-3.5 w-3.5"
          fill={mounted && isWishlisted ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>
    </motion.article>
  );
}
