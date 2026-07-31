import { roundRect, type BottleStyle, type CapShape } from "./bottleStyles";

/**
 * Every part is drawn as a connected segment of one vertical stack:
 *   cap -> collar -> neck -> shoulder -> body -> base
 * Each function receives the exact Y where the previous part ended, so
 * nothing floats detached from the bottle.
 */

/** Draws the cap. Always fills exactly capW x capH so it meets the collar. */
export function drawCap(
  ctx: CanvasRenderingContext2D,
  cx: number,
  top: number,
  capW: number,
  capH: number,
  style: BottleStyle,
  capShape: CapShape
) {
  const grad = ctx.createLinearGradient(cx - capW / 2, 0, cx + capW / 2, 0);
  grad.addColorStop(0, style.accent);
  grad.addColorStop(0.16, style.cap);
  grad.addColorStop(0.42, style.capHighlight);
  grad.addColorStop(0.68, style.cap);
  grad.addColorStop(1, style.accent);
  ctx.fillStyle = grad;

  const bottom = top + capH;

  switch (capShape) {
    case "domed": {
      // Rounded shoulders, flat base sitting flush on the collar
      ctx.beginPath();
      ctx.moveTo(cx - capW / 2, bottom);
      ctx.lineTo(cx - capW / 2, top + capH * 0.42);
      ctx.quadraticCurveTo(cx - capW / 2, top, cx, top);
      ctx.quadraticCurveTo(
        cx + capW / 2,
        top,
        cx + capW / 2,
        top + capH * 0.42
      );
      ctx.lineTo(cx + capW / 2, bottom);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "tiered": {
      // Two stacked blocks, the lower one flush with the collar
      roundRect(
        ctx,
        cx - capW * 0.34,
        top,
        capW * 0.68,
        capH * 0.42,
        [3, 3, 0, 0]
      );
      ctx.fill();
      roundRect(
        ctx,
        cx - capW / 2,
        top + capH * 0.4,
        capW,
        capH * 0.6,
        [2, 2, 1, 1]
      );
      ctx.fill();
      break;
    }
    case "sphere": {
      // Ball resting on a short plinth so it never floats
      const r = capW * 0.5;
      const plinthH = capH * 0.26;
      ctx.beginPath();
      ctx.arc(cx, top + r, r, Math.PI, 0);
      ctx.lineTo(cx + capW * 0.3, bottom - plinthH);
      ctx.lineTo(cx + capW * 0.3, bottom);
      ctx.lineTo(cx - capW * 0.3, bottom);
      ctx.lineTo(cx - capW * 0.3, bottom - plinthH);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "pyramid": {
      // Tapered wedge, wide at the base where it meets the collar
      ctx.beginPath();
      ctx.moveTo(cx - capW * 0.22, top);
      ctx.lineTo(cx + capW * 0.22, top);
      ctx.lineTo(cx + capW / 2, bottom);
      ctx.lineTo(cx - capW / 2, bottom);
      ctx.closePath();
      ctx.fill();
      break;
    }
    default: {
      // Classic squared cap
      roundRect(ctx, cx - capW / 2, top, capW, capH, [4, 4, 1, 1]);
      ctx.fill();
    }
  }

  // Vertical specular streak
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#ffffff";
  roundRect(
    ctx,
    cx - capW * 0.3,
    top + capH * 0.16,
    capW * 0.11,
    capH * 0.66,
    2
  );
  ctx.fill();
  ctx.restore();
}

/** Traces the body silhouette (no fill) so callers can fill or clip it. */
export function traceBody(
  ctx: CanvasRenderingContext2D,
  cx: number,
  topY: number,
  bodyW: number,
  bodyH: number,
  style: BottleStyle
) {
  const half = bodyW / 2;
  const inset = half * style.taper;
  const bottomY = topY + bodyH;

  switch (style.shape) {
    case "round": {
      const r = Math.min(half * 0.9, bodyH * 0.3);
      ctx.beginPath();
      ctx.moveTo(cx - half, topY + r);
      ctx.quadraticCurveTo(cx - half, topY, cx - half + r, topY);
      ctx.lineTo(cx + half - r, topY);
      ctx.quadraticCurveTo(cx + half, topY, cx + half, topY + r);
      ctx.lineTo(cx + half, bottomY - r);
      ctx.quadraticCurveTo(cx + half, bottomY, cx + half - r, bottomY);
      ctx.lineTo(cx - half + r, bottomY);
      ctx.quadraticCurveTo(cx - half, bottomY, cx - half, bottomY - r);
      ctx.closePath();
      break;
    }
    case "teardrop": {
      // Narrow rounded top widening to a full round base
      ctx.beginPath();
      ctx.moveTo(cx - half * 0.62, topY + bodyH * 0.06);
      ctx.quadraticCurveTo(cx - half * 0.62, topY, cx - half * 0.4, topY);
      ctx.lineTo(cx + half * 0.4, topY);
      ctx.quadraticCurveTo(
        cx + half * 0.62,
        topY,
        cx + half * 0.62,
        topY + bodyH * 0.06
      );
      ctx.bezierCurveTo(
        cx + half * 0.95,
        topY + bodyH * 0.38,
        cx + half,
        topY + bodyH * 0.62,
        cx + half,
        bottomY - bodyH * 0.14
      );
      ctx.quadraticCurveTo(
        cx + half,
        bottomY,
        cx + half - bodyH * 0.1,
        bottomY
      );
      ctx.lineTo(cx - half + bodyH * 0.1, bottomY);
      ctx.quadraticCurveTo(
        cx - half,
        bottomY,
        cx - half,
        bottomY - bodyH * 0.14
      );
      ctx.bezierCurveTo(
        cx - half,
        topY + bodyH * 0.62,
        cx - half * 0.95,
        topY + bodyH * 0.38,
        cx - half * 0.62,
        topY + bodyH * 0.06
      );
      ctx.closePath();
      break;
    }
    case "flask": {
      // Narrow at the top, swelling out toward the base
      ctx.beginPath();
      ctx.moveTo(cx - half * 0.72, topY);
      ctx.bezierCurveTo(
        cx - half * 0.72,
        topY + bodyH * 0.2,
        cx - half,
        topY + bodyH * 0.32,
        cx - half,
        topY + bodyH * 0.6
      );
      ctx.lineTo(cx - half, bottomY - 6);
      ctx.quadraticCurveTo(cx - half, bottomY, cx - half + 6, bottomY);
      ctx.lineTo(cx + half - 6, bottomY);
      ctx.quadraticCurveTo(cx + half, bottomY, cx + half, bottomY - 6);
      ctx.lineTo(cx + half, topY + bodyH * 0.6);
      ctx.bezierCurveTo(
        cx + half,
        topY + bodyH * 0.32,
        cx + half * 0.72,
        topY + bodyH * 0.2,
        cx + half * 0.72,
        topY
      );
      ctx.closePath();
      break;
    }
    case "obelisk": {
      // Straight taper, narrower at the top
      ctx.beginPath();
      ctx.moveTo(cx - half + inset * 2, topY);
      ctx.lineTo(cx + half - inset * 2, topY);
      ctx.lineTo(cx + half, bottomY - 4);
      ctx.quadraticCurveTo(cx + half, bottomY, cx + half - 4, bottomY);
      ctx.lineTo(cx - half + 4, bottomY);
      ctx.quadraticCurveTo(cx - half, bottomY, cx - half, bottomY - 4);
      ctx.closePath();
      break;
    }
    case "cube": {
      roundRect(ctx, cx - half, topY, bodyW, bodyH, 4);
      break;
    }
    default: {
      // classic / tall / wide — soft-cornered rectangle with a slight taper
      ctx.beginPath();
      ctx.moveTo(cx - half, topY + 4);
      ctx.quadraticCurveTo(cx - half, topY, cx - half + 4, topY);
      ctx.lineTo(cx + half - 4, topY);
      ctx.quadraticCurveTo(cx + half, topY, cx + half, topY + 4);
      ctx.lineTo(cx + half - inset, bottomY - 6);
      ctx.quadraticCurveTo(
        cx + half - inset,
        bottomY,
        cx + half - inset - 6,
        bottomY
      );
      ctx.lineTo(cx - half + inset + 6, bottomY);
      ctx.quadraticCurveTo(
        cx - half + inset,
        bottomY,
        cx - half + inset,
        bottomY - 6
      );
      ctx.closePath();
    }
  }
}
