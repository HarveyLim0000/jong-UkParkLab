"use client";

import { useEffect, useRef } from "react";

/**
 * A dot field with a P-QRS-T complex travelling through it. Dots near the
 * current signal value grow and take the accent colour, so the waveform reads
 * as a moving trace rather than a drawn line. Beat intervals vary, so no two
 * screenfuls look alike.
 */

// One row per beat: RR interval, then P, R, S, T amplitudes. Every beat is a
// little different, as in a real recording.
const BEATS = [
  [1.0, 0.12, 1.0, 0.4, 0.28],
  [0.78, 0.07, 0.84, 0.5, 0.2],
  [1.22, 0.16, 0.96, 0.3, 0.36],
  [0.92, 0.1, 0.78, 0.46, 0.24],
  [1.34, 0.14, 1.0, 0.34, 0.38],
  [0.84, 0.05, 0.9, 0.52, 0.18],
  [1.06, 0.13, 0.82, 0.38, 0.3],
  [0.74, 0.08, 0.72, 0.44, 0.16],
  [1.18, 0.17, 0.98, 0.32, 0.34],
  [0.96, 0.11, 0.86, 0.42, 0.26],
];
const BEAT_PX = 160; // baseline beat spacing
const COMPLEX_PX = 105; // P-QRS-T lasts the same time whatever the interval
const SPACING = 16; // dot grid pitch
const SPEED = 40; // px per second
const STEP = 2; // px between signal samples

const STARTS: number[] = [];
let cycle = 0;
for (const [rr] of BEATS) {
  STARTS.push(cycle);
  cycle += rr * BEAT_PX;
}

/** 0 → 1 → 0 straight-line spike over [a, b]. */
const tri = (p: number, a: number, b: number) => 1 - Math.abs((2 * (p - a)) / (b - a) - 1);

/** Normalised P-QRS-T amplitude over one complex. QRS is straight-edged so the peaks stay pointed. */
function complex(p: number, [, P, R, S, T]: number[]) {
  if (p < 0.08 || p >= 0.8) return 0;
  if (p < 0.2) return P * Math.sin((Math.PI * (p - 0.08)) / 0.12); // P
  if (p < 0.3) return 0;
  if (p < 0.33) return -0.2 * tri(p, 0.3, 0.33); // Q
  if (p < 0.39) return R * tri(p, 0.33, 0.39); // R
  if (p < 0.43) return -S * tri(p, 0.39, 0.43); // S
  if (p < 0.54) return 0;
  return T * Math.sin((Math.PI * (p - 0.54)) / 0.26); // T
}

function amplitudeAt(d: number) {
  const dd = ((d % cycle) + cycle) % cycle;
  let i = STARTS.length - 1;
  while (i > 0 && STARTS[i] > dd) i -= 1;
  // Slow baseline wander; whole periods per cycle so the loop has no seam.
  const wander = 0.04 * Math.sin((4 * Math.PI * dd) / cycle);
  return complex((dd - STARTS[i]) / COMPLEX_PX, BEATS[i]) + wander;
}

/** Distance from (px, py) to the segment (0, y1)–(STEP, y2). */
function segDist(px: number, py: number, y1: number, y2: number) {
  const dy = y2 - y1;
  const t = Math.min(1, Math.max(0, (px * STEP + (py - y1) * dy) / (STEP * STEP + dy * dy)));
  return Math.hypot(px - t * STEP, py - y1 - t * dy);
}

export default function Ecg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const accent = styles.getPropertyValue("--color-accent").trim() || "#8c1d18";
    const idle = styles.getPropertyValue("--color-placeholder").trim() || "#ebebeb";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (shift: number) => {
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;
      const gain = height * 0.46;
      const reach = SPACING * 0.8;

      // Light each dot by its true distance to the trace, so brightness changes
      // smoothly as the wave moves instead of popping column by column.
      const x0 = -reach;
      const ys: number[] = [];
      for (let x = x0; x <= width + reach + STEP; x += STEP) {
        ys.push(mid - amplitudeAt(x + shift) * gain);
      }

      for (let x = SPACING / 2; x < width; x += SPACING) {
        const first = Math.floor((x - reach - x0) / STEP);
        const last = Math.ceil((x + reach - x0) / STEP);
        for (let y = SPACING / 2; y < height; y += SPACING) {
          let near = Infinity;
          for (let i = first; i < last; i += 1) {
            near = Math.min(near, segDist(x - x0 - i * STEP, y, ys[i], ys[i + 1]));
          }
          const k = Math.max(0, 1 - near / reach);
          ctx.globalAlpha = 1;
          ctx.fillStyle = idle;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
          if (k > 0) {
            ctx.globalAlpha = Math.min(1, k * 2);
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(x, y, 1.1 + 4.1 * k * k, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    if (still) {
      draw(0);
      return;
    }

    let frame = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      draw(((now - start) / 1000) * SPEED);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="ecg-band">
      <canvas ref={ref} className="ecg" aria-hidden="true" />
    </div>
  );
}
