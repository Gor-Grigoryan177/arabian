import { PRODUCTS } from "./products-data";
import type { Product } from "@/types/product";

export { PRODUCTS };

export function getProductById(id: number) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getSimilarProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.type === product.type || p.gender === product.gender)
  ).slice(0, limit);
}

export function getBestSellers(limit = 4) {
  return PRODUCTS.filter((p) => p.badge === "Best Seller").slice(0, limit);
}

export function getNewArrivals(limit = 4) {
  return PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

/**
 * Counts shown on the home category cards. These deliberately include
 * unisex products in the Men and Women totals, so the number matches what
 * the shop page actually shows when that category is clicked.
 */
export function getCategoryCounts() {
  const unisex = PRODUCTS.filter((p) => p.gender === "Unisex").length;
  return {
    Men: PRODUCTS.filter((p) => p.gender === "Men").length + unisex,
    Women: PRODUCTS.filter((p) => p.gender === "Women").length + unisex,
    Unisex: unisex,
  };
}

export const BRANDS = [
  "Lattafa",
  "Hayati",
  "Afnan",
  "Ard Al Zaafaran",
] as const;
export const GENDERS = ["Men", "Women", "Unisex"] as const;
export const SCENT_TYPES = [
  "Sweet",
  "Fresh",
  "Woody",
  "Oriental",
  "Spicy",
] as const;

export function getQuizRecommendations(answers: {
  gender?: "Male" | "Female" | "Unisex";
  profile?: "Sweet" | "Fresh" | "Woody" | "Spicy";
}) {
  const genderMap: Record<string, "Men" | "Women" | "Unisex"> = {
    Male: "Men",
    Female: "Women",
    Unisex: "Unisex",
  };
  const mappedGender = genderMap[answers.gender ?? "Unisex"] ?? "Unisex";
  const profile = answers.profile ?? "Sweet";

  let results = PRODUCTS.filter((p) => {
    const genderOk =
      mappedGender === "Unisex" ||
      p.gender === mappedGender ||
      p.gender === "Unisex";
    const typeOk =
      p.type === profile || (profile === "Woody" && p.type === "Oriental");
    return genderOk && typeOk;
  }).slice(0, 4);

  if (results.length < 2) {
    results = PRODUCTS.filter(
      (p) => p.gender === mappedGender || p.gender === "Unisex"
    ).slice(0, 4);
  }
  return results;
}

/**
 * Product featured in the About section. Prefers one with real
 * photography — a photo always beats the drawn illustration there, and
 * this upgrades itself as photos are added without touching components.
 */
export function getShowcaseProduct(): Product | undefined {
  return PRODUCTS.find((p) => p.image) ?? PRODUCTS.find((p) => p.id === 1);
}

/** Sizes available across the catalogue, for the shop filter. */
export const SIZES = Array.from(new Set(PRODUCTS.map((p) => p.size))).sort();

/** Products default to in stock unless explicitly marked otherwise. */
export function isInStock(product: Product): boolean {
  return product.inStock !== false;
}
