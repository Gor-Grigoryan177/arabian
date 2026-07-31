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

export function getCategoryCounts() {
  return {
    Men: PRODUCTS.filter((p) => p.gender === "Men").length,
    Women: PRODUCTS.filter((p) => p.gender === "Women").length,
    Unisex: PRODUCTS.filter((p) => p.gender === "Unisex").length,
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
