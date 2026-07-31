import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAMD(price: number): string {
  return `֏ ${price.toLocaleString("en-US")}`;
}

export function slugifyBrand(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
}
