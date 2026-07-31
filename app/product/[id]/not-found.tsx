import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-6 py-24 text-center">
      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
        404
      </p>
      <h1 className="mb-4 font-display text-3xl font-light text-warmwhite">
        Fragrance not found
      </h1>
      <p className="mb-8 text-sm text-muted">
        The product you&apos;re looking for doesn&apos;t exist or may have been
        removed.
      </p>
      <Button asChild>
        <Link href="/shop">Browse All Fragrances</Link>
      </Button>
    </div>
  );
}
