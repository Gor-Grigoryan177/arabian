import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-6 py-28 text-center">
      <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
        404
      </p>
      <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3rem)] font-light text-warmwhite">
        This page doesn&apos;t exist
      </h1>
      <div className="mx-auto mb-6 h-px w-12 bg-gold" />
      <p className="mb-8 text-sm leading-relaxed text-muted">
        The page you&apos;re looking for may have moved, or the link might be
        wrong.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/shop">Browse Fragrances</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
