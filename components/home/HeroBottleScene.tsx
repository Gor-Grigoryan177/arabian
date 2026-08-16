"use client";

import { useEffect, useRef } from "react";
import { drawBottle } from "@/lib/canvas/drawBottle";
import { getBottleStyle } from "@/lib/canvas/bottleStyles";
import { getProductById } from "@/lib/products";
import {
  spawnPuff,
  stepPuff,
  drawPuff,
  createNoteLabelPool,
  stepLabel,
  drawLabel,
  type SmokePuff,
} from "@/lib/canvas/heroSmoke";

const MAX_DPR = 1.5; // capping avoids a needlessly huge canvas backing store on Retina/ProMotion displays

/**
 * Client-only canvas engine for the hero bottle: floats gently, and pours
 * out fragrance-note smoke that intensifies as the user scrolls the hero
 * section out of view.
 *
 * Performance notes (this component previously caused laggy page scroll):
 * - bottle position is cached and only recomputed on resize, not every
 *   frame — calling getBoundingClientRect() 60x/sec forces a synchronous
 *   layout recalculation on every frame, which fights the browser's own
 *   scroll rendering and is the classic cause of janky scrolling.
 * - the render loop fully stops (cancelAnimationFrame) once the hero
 *   scrolls out of view via IntersectionObserver, so scrolling further
 *   down the page costs nothing from this component.
 * - devicePixelRatio is capped rather than used raw.
 */
export function HeroBottleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottleZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    const zone = bottleZoneRef.current;
    if (!canvas || !section || !zone) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let bottleCenter = { x: 0, y: 0 };
    let zoneVisible = false;
    let sectionHeight = 1;

    function measure() {
      if (!canvas || !section || !zone) return;
      sectionHeight = section.offsetHeight || 1;
      canvas.width = section.offsetWidth * dpr;
      canvas.height = section.offsetHeight * dpr;
      canvas.style.width = `${section.offsetWidth}px`;
      canvas.style.height = `${section.offsetHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The bottle zone is display:none below the md breakpoint. A hidden
      // element measures 0x0, which previously made the bottle draw at the
      // canvas origin and overlap the hero copy on phones.
      zoneVisible = zone.offsetParent !== null && zone.clientWidth > 0;
      if (!zoneVisible) {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Cache the bottle position relative to the section. This only
      // changes on resize/layout shifts — NOT on scroll — so it is safe
      // (and much cheaper) to compute it here instead of every frame.
      const sr = section.getBoundingClientRect();
      const zr = zone.getBoundingClientRect();
      bottleCenter = {
        x: zr.left - sr.left + zr.width / 2,
        y: zr.top - sr.top + zr.height / 2,
      };
    }
    measure();
    window.addEventListener("resize", measure);
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", measure);

    let scrollIntensity = 0;
    function onScroll() {
      // Uses the height cached in measure() rather than reading offsetHeight
      // here — a layout read on every scroll event is what caused the
      // original scroll jank, and this handler fires constantly.
      scrollIntensity = Math.min(
        Math.max(window.scrollY / sectionHeight, 0),
        1
      );
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const heroProduct = getProductById(1);
    const heroStyle = getBottleStyle(
      heroProduct ?? {
        id: 1,
        name: "Khamrah",
        brand: "Lattafa",
        price: 0,
        size: "100ml",
        gender: "Unisex",
        type: "Sweet",
        rating: 5,
        reviewCount: 0,
        isNew: false,
        notes: { top: "", heart: "", base: "" },
        longevity: "",
        projection: "",
        season: "",
        occasion: "",
        longevityPct: 0,
        projectionPct: 0,
      }
    );

    const puffs: SmokePuff[] = [];
    const labels = createNoteLabelPool();
    let t = 0;
    let lastSpawn = 0;
    let raf = 0;
    let running = false;

    function frame() {
      if (!zoneVisible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      t++;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.clearRect(0, 0, w, h);

      const bc = bottleCenter;
      const floatOffset = Math.sin(t * 0.0015 * Math.PI * 2) * 10;
      const neckTopY = bc.y - 160 + floatOffset;

      const rate =
        scrollIntensity < 0.04
          ? 50
          : Math.max(2, Math.round(22 - scrollIntensity * 20));
      if (t - lastSpawn > rate) {
        const n = scrollIntensity < 0.04 ? 1 : Math.ceil(scrollIntensity * 5);
        for (let i = 0; i < n; i++) {
          if (puffs.length < 80)
            puffs.push(spawnPuff(bc.x, neckTopY, scrollIntensity));
        }
        lastSpawn = t;
      }
      if (t % 60 === 0) puffs.push(spawnPuff(bc.x, neckTopY, 0.03));

      if (scrollIntensity > 0.08 && t % 28 === 0) {
        const dead = labels.find((l) => l.phase === "dead");
        if (dead) {
          dead.x = bc.x + (Math.random() - 0.5) * 70;
          dead.y = neckTopY + (Math.random() - 0.5) * 20;
          dead.vx = (Math.random() - 0.5) * 0.8;
          dead.vy = -(0.4 + Math.random() * 0.8);
          dead.opacity = 0;
          dead.age = 0;
          dead.phase = "in";
        }
      }

      for (let i = puffs.length - 1; i >= 0; i--) {
        const alive = stepPuff(puffs[i]!, t, i);
        if (!alive) {
          puffs.splice(i, 1);
          continue;
        }
        drawPuff(ctx!, puffs[i]!);
      }

      labels.forEach((lb) => {
        stepLabel(lb, t);
        drawLabel(ctx!, lb);
      });

      drawBottle({
        ctx: ctx!,
        cx: bc.x,
        cy: bc.y,
        width: 150,
        height: 340,
        style: heroStyle,
        arabicName: "خمرة",
        englishName: "Khamrah",
        brandLabel: "Lattafa",
        sizeLabel: "EDP · 100ml",
        floatOffset,
      });

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Only animate while the hero is actually visible — scrolling past it
    // should cost nothing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(section);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full md:block"
        aria-hidden="true"
      />
      <div
        ref={bottleZoneRef}
        className="relative hidden h-[580px] w-[480px] shrink-0 md:block"
      />
    </>
  );
}
