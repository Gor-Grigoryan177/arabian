import { roundRect, type BottleStyle } from "./bottleStyles";
import { drawCap, traceBody } from "./bottleShapes";

export interface DrawBottleOptions {
  ctx: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  width: number;
  height: number;
  style: BottleStyle;
  arabicName: string;
  englishName: string;
  brandLabel: string;
  sizeLabel?: string;
  floatOffset?: number;
}

/**
 * Draws text centred at (x, y), shrinking the font until it fits within
 * maxWidth. Without this, long names like "Supremacy Silver" render wider
 * than the bottle itself.
 */
function fitText(
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

/** Proportions of the vertical stack — these sum to 1.0. */
const CAP_RATIO = 0.14;
const COLLAR_RATIO = 0.022;
const NECK_RATIO = 0.055;
const SHOULDER_RATIO = 0.1;

/**
 * Renders a stylised perfume bottle as one connected vertical stack:
 * cap -> collar -> neck -> shoulder -> body -> base. Each segment starts
 * exactly where the previous one ended, so no part ever floats detached.
 *
 * Silhouette, cap style, palette and proportions come from the
 * per-product BottleStyle, so each product looks distinct. Only real
 * product text is drawn on the label.
 */
export function drawBottle({
  ctx,
  cx,
  cy,
  width,
  height,
  style,
  arabicName,
  englishName,
  brandLabel,
  sizeLabel,
  floatOffset = 0,
}: DrawBottleOptions) {
  const bw = width * style.widthRatio;
  const bh = height * style.heightRatio;
  const top = cy + floatOffset - bh / 2;

  // At product-card size the surrounding UI already shows name, brand and
  // size as real text, so the label is decorative — printing four cramped
  // lines of 5px type there just reads as noise. Below this threshold we
  // show the name only.
  const compact = bw < 95;

  // Ground shadow
  const shadow = ctx.createRadialGradient(
    cx,
    top + bh + 6,
    0,
    cx,
    top + bh + 6,
    bw * 0.6
  );
  shadow.addColorStop(0, "rgba(0,0,0,0.5)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.ellipse(cx, top + bh + 6, bw * 0.45, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = shadow;
  ctx.fill();

  // ── Segment heights ──────────────────────────────────────────────
  const capH = bh * CAP_RATIO;
  const collarH = bh * COLLAR_RATIO;
  const neckH = bh * NECK_RATIO;
  const shoulderH = bh * SHOULDER_RATIO;
  const bodyH = bh - capH - collarH - neckH - shoulderH;

  // ── Segment widths ───────────────────────────────────────────────
  const neckW = bw * 0.24;
  const capW = neckW * 1.75; // cap always reads as sitting over the neck
  const collarW = neckW * 1.35;
  const bodyW = bw;

  // ── Y positions (each starts where the last ended) ────────────────
  const capTop = top;
  const collarTop = capTop + capH;
  const neckTop = collarTop + collarH;
  const shoulderTop = neckTop + neckH;
  const bodyTop = shoulderTop + shoulderH;

  // ── Neck (drawn first so cap/shoulder overlap it cleanly) ─────────
  const neckGrad = ctx.createLinearGradient(
    cx - neckW / 2,
    0,
    cx + neckW / 2,
    0
  );
  neckGrad.addColorStop(0, style.accent);
  neckGrad.addColorStop(0.4, style.capHighlight);
  neckGrad.addColorStop(1, style.accent);
  ctx.fillStyle = neckGrad;
  ctx.fillRect(cx - neckW / 2, neckTop - 1, neckW, neckH + 2);

  // ── Shoulder: flares from neck width out to body width ────────────
  ctx.beginPath();
  ctx.moveTo(cx - neckW / 2, shoulderTop);
  ctx.bezierCurveTo(
    cx - neckW / 2,
    shoulderTop + shoulderH * 0.55,
    cx - bodyW / 2,
    shoulderTop + shoulderH * 0.45,
    cx - bodyW / 2,
    bodyTop
  );
  ctx.lineTo(cx + bodyW / 2, bodyTop);
  ctx.bezierCurveTo(
    cx + bodyW / 2,
    shoulderTop + shoulderH * 0.45,
    cx + neckW / 2,
    shoulderTop + shoulderH * 0.55,
    cx + neckW / 2,
    shoulderTop
  );
  ctx.closePath();
  const shoulderGrad = ctx.createLinearGradient(
    cx - bodyW / 2,
    0,
    cx + bodyW / 2,
    0
  );
  shoulderGrad.addColorStop(0, style.body2);
  shoulderGrad.addColorStop(0.2, style.body);
  shoulderGrad.addColorStop(0.8, style.body);
  shoulderGrad.addColorStop(1, style.body2);
  ctx.fillStyle = shoulderGrad;
  ctx.fill();

  // ── Body ──────────────────────────────────────────────────────────
  traceBody(ctx, cx, bodyTop - 1, bodyW, bodyH + 1, style);
  ctx.fillStyle = shoulderGrad;
  ctx.fill();

  // Glass lighting, clipped to the body silhouette
  ctx.save();
  traceBody(ctx, cx, bodyTop - 1, bodyW, bodyH + 1, style);
  ctx.clip();

  const key = ctx.createLinearGradient(
    cx - bodyW / 2,
    0,
    cx - bodyW / 2 + bodyW * 0.32,
    0
  );
  key.addColorStop(0, "rgba(255,255,255,0.18)");
  key.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = key;
  ctx.fillRect(cx - bodyW / 2, bodyTop, bodyW * 0.32, bodyH);

  const rim = ctx.createLinearGradient(
    cx + bodyW / 2 - bodyW * 0.24,
    0,
    cx + bodyW / 2,
    0
  );
  rim.addColorStop(0, "rgba(0,0,0,0)");
  rim.addColorStop(1, "rgba(0,0,0,0.38)");
  ctx.fillStyle = rim;
  ctx.fillRect(cx + bodyW / 2 - bodyW * 0.24, bodyTop, bodyW * 0.24, bodyH);

  const sheen = ctx.createLinearGradient(0, bodyTop, 0, bodyTop + bodyH * 0.3);
  sheen.addColorStop(0, "rgba(255,255,255,0.12)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(cx - bodyW / 2, bodyTop, bodyW, bodyH * 0.3);
  ctx.restore();

  // ── Collar ring between cap and neck ──────────────────────────────
  ctx.fillStyle = style.cap;
  roundRect(ctx, cx - collarW / 2, collarTop, collarW, collarH + 1, 1);
  ctx.fill();

  // ── Cap (drawn last on top so it reads as seated on the collar) ───
  drawCap(ctx, cx, capTop, capW, capH, style, style.capShape);

  // ── Label ─────────────────────────────────────────────────────────
  const labelW = bodyW * 0.68;
  const labelH = bodyH * 0.46;
  const labelY = bodyTop + bodyH * 0.22;

  roundRect(ctx, cx - labelW / 2, labelY, labelW, labelH, 2);
  ctx.fillStyle = "rgba(8,5,2,0.55)";
  ctx.fill();
  ctx.strokeStyle = `${style.accent}99`;
  ctx.lineWidth = 0.7;
  roundRect(ctx, cx - labelW / 2, labelY, labelW, labelH, 2);
  ctx.stroke();

  ctx.save();
  ctx.textAlign = "center";

  // Only render the Arabic line when we actually have a distinct Arabic
  // name — otherwise the product name would be printed twice.
  const hasArabic = arabicName.trim().length > 0 && arabicName !== englishName;

  if (hasArabic) {
    ctx.fillStyle = style.capHighlight;
    fitText(
      ctx,
      arabicName,
      cx,
      labelY + labelH * 0.3,
      labelW * 0.84,
      Math.max(9, bw * 0.13),
      (s) => `italic 300 ${s}px "Cormorant Garamond", Georgia, serif`
    );

    ctx.beginPath();
    ctx.moveTo(cx - labelW * 0.3, labelY + labelH * 0.41);
    ctx.lineTo(cx + labelW * 0.3, labelY + labelH * 0.41);
    ctx.strokeStyle = `${style.accent}66`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.fillStyle = "#f5ecdc";
    fitText(
      ctx,
      englishName.toUpperCase(),
      cx,
      labelY + labelH * 0.6,
      labelW * 0.84,
      Math.max(6, bw * 0.068),
      (s) => `400 ${s}px "Jost", sans-serif`
    );
  } else {
    // Name-only layout: give the product name the space the Arabic line
    // would have used so it reads clearly at card size.
    ctx.fillStyle = "#f7efe2";
    fitText(
      ctx,
      englishName,
      cx,
      labelY + labelH * (compact ? 0.6 : 0.42),
      labelW * 0.86,
      Math.max(10, bw * 0.135),
      (s) => `300 ${s}px "Cormorant Garamond", Georgia, serif`
    );

    if (!compact) {
      ctx.beginPath();
      ctx.moveTo(cx - labelW * 0.28, labelY + labelH * 0.55);
      ctx.lineTo(cx + labelW * 0.28, labelY + labelH * 0.55);
      ctx.strokeStyle = `${style.accent}66`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  if (!compact) {
    ctx.fillStyle = `${style.accent}dd`;
    fitText(
      ctx,
      brandLabel,
      cx,
      labelY + labelH * (hasArabic ? 0.8 : 0.76),
      labelW * 0.8,
      Math.max(5.5, bw * 0.055),
      (s) => `300 ${s}px "Jost", sans-serif`
    );

    if (sizeLabel) {
      ctx.font = `300 ${Math.max(5, bw * 0.046)}px "Jost", sans-serif`;
      ctx.fillStyle = "rgba(215,195,155,0.65)";
      ctx.fillText(sizeLabel, cx, labelY + labelH * 0.95);
    }
  }
  ctx.restore();

  // ── Specular hotspot on the glass ─────────────────────────────────
  const spec = ctx.createRadialGradient(
    cx - bodyW * 0.27,
    bodyTop + bodyH * 0.14,
    0,
    cx - bodyW * 0.27,
    bodyTop + bodyH * 0.14,
    bw * 0.18
  );
  spec.addColorStop(0, "rgba(255,255,255,0.22)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(cx - bodyW * 0.27, bodyTop + bodyH * 0.14, bw * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = spec;
  ctx.fill();
}
