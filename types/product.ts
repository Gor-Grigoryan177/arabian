export type Brand = "Lattafa" | "Hayati" | "Afnan" | "Ard Al Zaafaran";
export type Gender = "Men" | "Women" | "Unisex";
export type ScentType = "Sweet" | "Fresh" | "Woody" | "Oriental" | "Spicy";
export type Badge = "Best Seller" | "New" | "Premium";

export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: number;
  name: string;
  brand: Brand;
  price: number;
  size: string;
  gender: Gender;
  type: ScentType;
  rating: number;
  reviewCount: number;
  badge?: Badge;
  isNew: boolean;
  notes: FragranceNotes;
  longevity: string;
  projection: string;
  season: string;
  occasion: string;
  longevityPct: number;
  projectionPct: number;
  /**
   * Path to a real product photo under /public, e.g. "/products/khamrah.jpg".
   * When present it is used instead of the generated bottle illustration.
   * Leave undefined until you have licensed/own photography.
   */
  image?: string;
  /**
   * Out-of-stock products stay visible (they still drive interest and SEO)
   * but cannot be ordered. Omitted means in stock, so existing products
   * need no change.
   */
  inStock?: boolean;
}

export interface ShopFilterState {
  genders: Gender[];
  brands: Brand[];
  types: ScentType[];
  sizes: string[];
  maxPrice: number;
  search: string;
}

export interface QuizAnswers {
  gender?: Gender | "Male" | "Female";
  profile?: ScentType;
  occasion?: "Daily" | "Evening" | "Both";
  strength?: "Soft" | "Moderate" | "Strong";
}
