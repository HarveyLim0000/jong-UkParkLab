"use client";

import { useEffect, useRef } from "react";

/**
 * An ECG trace scrolling left across the hero, on a faint ECG-paper grid,
 * all in straight lines. Every beat is a clear P-QRS-T, but the rate, the
 * heights and the timing of the waves each swing on their own, out of step,
 * so no two beats are alike. Every so often a small heart drawn as an ECG
 * zigzag comes along.
 */

const H = 240; // viewBox height
const BASE = 120; // baseline y, mid-band: waves go both ways
const GRID = 50; // a 0.2 s paper square at 4 ms per unit
const W = 2800; // wide enough for the widest screens at the band's height
const SPEED = 75; // units per second the trace moves left
const HEART = 1.6; // heart scale: ~51 units wide, ~46 tall
const ZIGS = 24; // zigzag strokes across the heart, an even number
const LIFT = 10; // how far the heart sits up, in heart-curve units

type Pt = [number, number];

/** An endless trace from a seed; the same seed always draws the same trace. */
function createTrace(seed = 16) {
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const u = (lo: number, hi: number) => lo + (hi - lo) * rand();

  const tape: Pt[] = [[0, BASE]];
  // points as [x, height above the baseline]
  const at = (...pts: Pt[]) => pts.forEach(([x, h]) => tape.push([x, BASE - h]));
  const pen = () => tape[tape.length - 1][0];

  // A slow swing between -1 and 1 along the trace: two sine waves of unrelated
  // periods, each at a random phase
  const swing = () => {
    const [l1, l2, f1, f2] = [u(1400, 2400), u(350, 650), u(0, 7), u(0, 7)];
    return (x: number) =>
      0.65 * Math.sin((2 * Math.PI * x) / l1 + f1) + 0.35 * Math.sin((2 * Math.PI * x) / l2 + f2);
  };
  const [rate, size, pSize, sSize, tSize, pr, st] = Array.from({ length: 7 }, swing);

  /** A P-QRS-T beat with its R at x, stretched by k. */
  function beat(x: number, k: number) {
    const g = 0.7 + 0.15 * size(x) + u(-0.28, 0.28); // each beat its own height
    const p = (10 + 3 * pSize(x)) * u(0.6, 1.4);
    const s = (22 + 12 * sSize(x)) * g;
    const t = (20 + 6 * tSize(x)) * u(0.6, 1.35);
    const q0 = x - 8 * k; // QRS onset
    const p0 = q0 - (36 + 10 * pr(x)) * k; // P onset, a PR interval before
    const t0 = x + (31 + 11 * st(x)) * k; // T onset, after the ST segment
    at([p0, 0], [p0 + 9 * k, p], [p0 + 18 * k, 0]);
    at([q0, 0], [x - 5 * k, -4 * g], [x, 95 * g], [x + 5 * k, -s], [x + 9 * k, 0]);
    at([t0, 0], [t0 + 32 * k, t], [t0 + 50 * k, 0]);
  }

  /**
   * A heart as an ECG zigzag: alternate vertices on the top and bottom edges
   * of the classic heart curve, lifted so it stands mostly above the baseline,
   * with straight lines up into it and down out of it.
   */
  function heart() {
    let x = pen() + 30;
    at([x, 0]);
    for (let k = 0; k <= ZIGS; k += 1) {
      const hx = -16 + (32 * k) / ZIGS;
      const t = Math.asin(Math.cbrt(Math.abs(hx) / 16));
      const a = (k - ZIGS / 2) % 2 ? t : Math.PI - t; // top and bottom edges in turn, the middle on the bottom tip
      const h = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a) - 4;
      at([x + HEART * (hx + 16), HEART * (h + LIFT)]);
    }
    x += 32 * HEART;
    at([x, 0], [x + 50, 0]);
  }

  let r = -80; // x of the last R
  let toHeart = 600; // distance to the next heart

  /** Writes the trace on until it reaches x. */
  function extendTo(x: number) {
    while (pen() < x) {
      const x0 = pen();
      if (toHeart <= 0) {
        heart();
        toHeart = u(1300, 1800);
      } else {
        // a beat at a faster rate is a narrower beat
        const rr = 135 + 45 * rate(r) + u(-5, 5);
        const k = Math.sqrt(rr / 200);
        r = Math.max(r + rr, pen() + 58 * k); // its P starts after the last T
        beat(r, k);
      }
      toHeart -= pen() - x0;
    }
  }

  return { tape, extendTo };
}

const path = (tape: Pt[], offset: number) =>
  "M" + tape.map(([x, y]) => `${(x - offset).toFixed(1)} ${y.toFixed(1)}`).join("L");

// The first screenful, rendered on the server; each client starts the same
// trace from the same seed and moves on from here
const FIRST = createTrace();
FIRST.extendTo(W + 50);
const FIRST_PATH = path(FIRST.tape, 0);

let PAPER = "";
for (let x = 0; x <= W; x += GRID) PAPER += `M${x} 0V${H}`;
for (let y = BASE % GRID; y <= H; y += GRID) PAPER += `M0 ${y}H${W}`;

export default function Ecg() {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = ref.current;
    if (!line || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { tape, extendTo } = createTrace();
    extendTo(W + 50);
    let offset = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      // capped, so a tab left in the background doesn't jump on return
      offset += (Math.min(now - last, 100) / 1000) * SPEED;
      last = now;
      while (tape.length > 2 && tape[1][0] < offset) tape.shift();
      extendTo(offset + W + 50);
      line.setAttribute("d", path(tape, offset));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="ecg-band" aria-hidden="true">
      <svg className="ecg" viewBox={`0 0 ${W} ${H}`} style={{ aspectRatio: `${W} / ${H}` }}>
        <defs>
          {/* the paper is strongest along the baseline and fades out above and below */}
          <linearGradient id="ecg-paper-fade" gradientUnits="userSpaceOnUse" x2="0" y2={H}>
            <stop offset="0.05" stopOpacity="0" />
            <stop offset="0.5" stopOpacity="0.1" />
            <stop offset="0.95" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="ecg-paper" d={PAPER} />
        <path ref={ref} className="ecg-trace" d={FIRST_PATH} />
      </svg>
    </div>
  );
}
