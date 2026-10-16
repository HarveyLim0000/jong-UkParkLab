"use client";

import { useEffect, useRef } from "react";

/**
 * A dot field with a P-QRS-T complex travelling through it. Dots near the
 * current signal value grow and take the accent colour, so the waveform reads
 * as a moving trace rather than a drawn line. Beat intervals vary, so no two
 * screenfuls look alike.
 */

const RR = [1.0, 0.78, 1.22, 0.92, 1.34, 0.84, 1.06, 0.74, 1.18, 0.96];
const BEAT_PX = 160; // baseline beat spacing
const COMPLEX_PX = 105; // P-QRS-T lasts the same time whatever the interval
const SPACING = 16; // dot grid pitch
const SPEED = 95; // px per second
const SUB = 5; // sub-samples per dot column, so Q and S are never skipped

const STARTS: number[] = [];
let cycle = 0;
for (const rr of RR) {
  STARTS.push(cycle);
  cycle += rr * BEAT_PX;
}

/** Normalised P-QRS-T amplitude over one complex. */
function complex(p: number) {
  if (p < 0.08 || p >= 0.8) return 0;
  if (p < 0.2) return 0.14 * Math.sin((Math.PI * (p - 0.08)) / 0.12); // P
  if (p < 0.28) return 0;
  if (p < 0.34) return -0.22 * Math.sin((Math.PI * (p - 0.28)) / 0.06); // Q
  if (p < 0.4) return Math.sin((Math.PI * (p - 0.34)) / 0.06); // R
  if (p < 0.48) return -0.48 * Math.sin((Math.PI * (p - 0.4)) / 0.08); // S
  if (p < 0.56) return 0;
  return 0.3 * Math.sin((Math.PI * (p - 0.56)) / 0.24); // T
}

function amplitudeAt(d: number) {
  const dd = ((d % cycle) + cycle) % cycle;
  let i = STARTS.length - 1;
  while (i > 0 && STARTS[i] > dd) i -= 1;
  return complex((dd - STARTS[i]) / COMPLEX_PX);
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
      const reach = SPACING * 1.5;
      const half = SPACING / 2;

      for (let x = half; x < width; x += SPACING) {
        // Q and S are narrower than the dot pitch, so take the range the signal
        // covers across this column rather than a single reading at its centre.
        let lo = Infinity;
        let hi = -Infinity;
        for (let i = 0; i < SUB; i += 1) {
          const v = mid - amplitudeAt(x - half + (SPACING * i) / (SUB - 1) + shift) * gain;
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const gap = y < lo ? lo - y : y > hi ? y - hi : 0;
          const k = Math.max(0, 1 - gap / reach);
          const r = 1.1 + 2.8 * k * k;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = k > 0.02 ? accent : idle;
          ctx.globalAlpha = k > 0.02 ? 0.2 + 0.8 * k : 1;
          ctx.fill();
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
