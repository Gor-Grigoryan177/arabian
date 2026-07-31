export interface SmokePuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  opacity: number;
  maxOpacity: number;
  phase: "in" | "hold" | "out";
  age: number;
  life: number;
  color: [number, number, number];
  blur: number;
}

const NOTE_COLORS: [number, number, number][] = [
  [200, 169, 110],
  [226, 190, 130],
  [180, 130, 70],
  [240, 200, 130],
  [160, 120, 55],
];

export function spawnPuff(x: number, y: number, intensity: number): SmokePuff {
  const spread = 20 + intensity * 60;
  const speed = 0.6 + intensity * 2 + Math.random() * 0.8;
  return {
    x: x + (Math.random() - 0.5) * spread,
    y: y - Math.random() * 10,
    vx: (Math.random() - 0.5) * (0.3 + intensity),
    vy: -speed,
    size: 6 + Math.random() * 20 + intensity * 30,
    maxSize: 24 + Math.random() * 60 + intensity * 60,
    opacity: 0,
    maxOpacity: 0.06 + Math.random() * 0.12 + intensity * 0.08,
    phase: "in",
    age: 0,
    life: 100 + Math.random() * 160 + intensity * 80,
    color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)] as [
      number,
      number,
      number,
    ],
    blur: 10 + Math.random() * 20,
  };
}

export function stepPuff(p: SmokePuff, t: number, index: number): boolean {
  p.x += p.vx + Math.sin(t * 0.02 + index * 0.7) * 0.2;
  p.y += p.vy;
  p.vy *= 0.994;
  p.vx *= 0.997;
  p.size = Math.min(p.size + 0.5, p.maxSize);
  p.age++;

  if (p.phase === "in") {
    p.opacity += 0.007;
    if (p.opacity >= p.maxOpacity) p.phase = "hold";
  } else if (p.phase === "hold") {
    if (p.age > p.life * 0.55) p.phase = "out";
  } else {
    p.opacity -= 0.003;
    if (p.opacity <= 0) return false; // dead — remove from array
  }
  return true;
}

export function drawPuff(ctx: CanvasRenderingContext2D, p: SmokePuff) {
  ctx.save();
  const [r, g, b] = p.color;
  const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
  grad.addColorStop(0, `rgba(${r},${g},${b},${p.opacity})`);
  grad.addColorStop(0.55, `rgba(${r},${g},${b},${p.opacity * 0.35})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

export interface NoteLabel {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  maxOpacity: number;
  phase: "in" | "hold" | "out" | "dead";
  age: number;
  maxAge: number;
  size: number;
}

export const FRAGRANCE_NOTE_WORDS = [
  "Oud",
  "Rose",
  "Amber",
  "Musk",
  "Saffron",
  "Vanilla",
  "Jasmine",
  "Cedarwood",
  "Bergamot",
  "Patchouli",
  "Cardamom",
  "Neroli",
];

export function createNoteLabelPool(): NoteLabel[] {
  return FRAGRANCE_NOTE_WORDS.map((text) => ({
    text,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    opacity: 0,
    maxOpacity: 0.32 + Math.random() * 0.2,
    phase: "dead",
    age: 0,
    maxAge: 180 + Math.random() * 120,
    size: 11 + Math.floor(Math.random() * 5),
  }));
}

export function stepLabel(lb: NoteLabel, t: number) {
  if (lb.phase === "dead") return;
  lb.x += lb.vx + Math.sin(t * 0.012) * 0.15;
  lb.y += lb.vy;
  lb.vy *= 0.996;
  lb.age++;
  if (lb.phase === "in") {
    lb.opacity += 0.01;
    if (lb.opacity >= lb.maxOpacity) lb.phase = "hold";
  } else if (lb.phase === "hold") {
    if (lb.age > lb.maxAge * 0.6) lb.phase = "out";
  } else if (lb.phase === "out") {
    lb.opacity -= 0.005;
    if (lb.opacity <= 0) lb.phase = "dead";
  }
}

export function drawLabel(ctx: CanvasRenderingContext2D, lb: NoteLabel) {
  if (lb.phase === "dead") return;
  ctx.save();
  ctx.font = `300 ${lb.size}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = `rgba(200,160,60,${lb.opacity})`;
  ctx.textAlign = "center";
  ctx.fillText(lb.text, lb.x, lb.y);
  ctx.restore();
}
