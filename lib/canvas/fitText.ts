/**
 * Draws text centred at (x, y), shrinking the font until it fits within
 * maxWidth. Without this, long names like "Supremacy Silver" render wider
 * than the bottle itself.
 */
export function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  startSize: number,
  fontSpec: (size: number) => string,
  minSize = 5
) {
  let size = startSize;
  ctx.font = fontSpec(size);
  while (ctx.measureText(text).width > maxWidth && size > minSize) {
    size -= 0.5;
    ctx.font = fontSpec(size);
  }
  ctx.fillText(text, x, y);
}
