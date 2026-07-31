"use client";

import { useEffect, useRef } from "react";
import { drawBottle } from "@/lib/canvas/drawBottle";
import { getBottleStyle, type BottleStyle } from "@/lib/canvas/bottleStyles";
import type { Product } from "@/types/product";

interface BottleCanvasProps {
  /** Pass a product to get its unique generated bottle design. */
  product?: Product;
  /** Or pass an explicit style + labels (used by the About showcase). */
  style?: BottleStyle;
  arabicName?: string;
  englishName?: string;
  brandLabel?: string;
  sizeLabel?: string;
  className?: string;
  ariaLabel: string;
}

const MAX_DPR = 1.5;

/**
 * Renders a single static bottle sized to its container. Redraws on
 * resize via ResizeObserver. Every product gets a visually distinct
 * bottle (shape, cap, palette, proportions) derived from its data.
 */
export function BottleCanvas({
  product,
  style,
  arabicName,
  englishName,
  brandLabel,
  sizeLabel,
  className,
  ariaLabel,
}: BottleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resolvedStyle = style ?? (product ? getBottleStyle(product) : null);
    if (!resolvedStyle) return;

    function draw() {
      if (!canvas || !ctx || !parent || !resolvedStyle) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      drawBottle({
        ctx,
        cx: w / 2,
        cy: h / 2,
        width: Math.min(w * 0.6, 170),
        height: Math.min(h * 0.84, 310),
        style: resolvedStyle,
        arabicName: arabicName ?? product?.name ?? "",
        englishName: englishName ?? product?.name ?? "",
        brandLabel: brandLabel ?? product?.brand ?? "",
        sizeLabel: sizeLabel ?? product?.size,
      });
    }

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [product, style, arabicName, englishName, brandLabel, sizeLabel]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className={className}
    />
  );
}
