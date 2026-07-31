import type { Product, ScentType } from "@/types/product";

export type BottleShape =
  | "classic"
  | "tall"
  | "wide"
  | "round"
  | "flask"
  | "obelisk"
  | "cube"
  | "teardrop";

export type CapShape = "block" | "domed" | "tiered" | "sphere" | "pyramid";

export interface BottleStyle {
  body: string;
  body2: string;
  cap: string;
  capHighlight: string;
  accent: string;
  shape: BottleShape;
  capShape: CapShape;
  /** 0-1 — how much the body tapers inward toward the base */
  taper: number;
  /** body width as a fraction of the allotted width */
  widthRatio: number;
  /** body height as a fraction of the allotted height */
  heightRatio: number;
}

/**
 * Scent family drives the glass/liquid colour palette. This is what makes a
 * Sweet oriental read warm-amber while a Fresh citrus reads cool-silver,
 * rather than every bottle being the same dark rectangle.
 */
const SCENT_PALETTES: Record<
  ScentType,
  Pick<BottleStyle, "body" | "body2" | "cap" | "capHighlight" | "accent">
> = {
  Sweet: {
    body: "#2a1409",
    body2: "#4a2410",
    cap: "#d4a55e",
    capHighlight: "#f5dca8",
    accent: "#e0a860",
  },
  Fresh: {
    body: "#0d1a24",
    body2: "#16303f",
    cap: "#a8c8dc",
    capHighlight: "#dcf0ff",
    accent: "#8fbcd4",
  },
  Woody: {
    body: "#1a1108",
    body2: "#2e1f10",
    cap: "#b08850",
    capHighlight: "#e0c088",
    accent: "#a07840",
  },
  Oriental: {
    body: "#1d0f22",
    body2: "#341a3c",
    cap: "#c9a0d8",
    capHighlight: "#ecd0f5",
    accent: "#b888c8",
  },
  Spicy: {
    body: "#240c0a",
    body2: "#411510",
    cap: "#d08858",
    capHighlight: "#f5c098",
    accent: "#c07850",
  },
};

const SHAPES: BottleShape[] = [
  "classic",
  "tall",
  "wide",
  "round",
  "flask",
  "obelisk",
  "cube",
  "teardrop",
];

const CAPS: CapShape[] = ["block", "domed", "tiered", "sphere", "pyramid"];

/**
 * Deterministic per-product style. Two products of the same scent family
 * share a palette (so the collection still looks coherent) but differ in
 * silhouette, cap, proportions and taper — so no two bottles on the grid
 * look identical. Deterministic (keyed off product id) so a bottle never
 * changes appearance between renders or page loads.
 */
export function getBottleStyle(product: Product): BottleStyle {
  const palette = SCENT_PALETTES[product.type];
  const id = product.id;

  const shape = SHAPES[id % SHAPES.length]!;
  const capShape = CAPS[(id * 3) % CAPS.length]!;

  // Vary proportions slightly per product, seeded from the id.
  const taper = 0.04 + ((id * 7) % 10) / 100; // 0.04 – 0.13
  const widthRatio = 0.82 + ((id * 5) % 18) / 100; // 0.82 – 1.00
  const heightRatio = 0.9 + ((id * 11) % 20) / 100; // 0.90 – 1.10

  return { ...palette, shape, capShape, taper, widthRatio, heightRatio };
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | [number, number, number, number]
) {
  const [tl, tr, br, bl] = typeof r === "number" ? [r, r, r, r] : r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.arcTo(x + w, y, x + w, y + tr, tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
  ctx.lineTo(x + bl, y + h);
  ctx.arcTo(x, y + h, x, y + h - bl, bl);
  ctx.lineTo(x, y + tl);
  ctx.arcTo(x, y, x + tl, y, tl);
  ctx.closePath();
}
