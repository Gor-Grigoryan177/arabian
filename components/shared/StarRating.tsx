interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);
  const stars =
    "\u2605".repeat(fullStars) +
    (hasHalf ? "½" : "") +
    "\u2606".repeat(emptyStars);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      <span className="text-[11px] text-gold" aria-hidden="true">
        {stars}
      </span>
      {reviewCount !== undefined && (
        <span className="text-[10px] text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
