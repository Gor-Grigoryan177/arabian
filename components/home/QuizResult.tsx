import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  results: Product[];
  onReset: () => void;
}

export function QuizResult({ results, onReset }: QuizResultProps) {
  return (
    <div>
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.25em] text-gold">
        Your Perfect Match
      </p>
      <ProductGrid products={results} />
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={onReset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
