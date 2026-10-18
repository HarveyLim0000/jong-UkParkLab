"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { NewsItem } from "@/lib/content";

type Labels = { title: string; prev: string; next: string };

function Arrow({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// until the first news item is in, sample slides (blank photo, sample date
// and title) hold the slider's place and show where each part will sit
const PLACEHOLDER_SLIDES = 3;

/**
 * One news item per slide, newest first: photo, date, text. The slides are a
 * scroll-snapped row, so touch and trackpad swipes are the browser's own; the
 * arrows and dots scroll that row, and its scroll position decides the
 * current dot. Nothing advances on its own.
 */
export default function NewsCarousel({ items, labels }: { items: NewsItem[]; labels: Labels }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = items.length || PLACEHOLDER_SLIDES;

  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <aside className="hero-news">
      <h3 className="hero-news-title">{labels.title}</h3>
      <ul
        ref={track}
        className="news-track"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {items.length > 0
          ? items.map((n) => (
              <li key={n.date + n.text}>
                <div className="image-wrapper">
                  {/* the text below says what the photo shows */}
                  <Image src={n.image} alt="" fill sizes="(max-width: 900px) 480px, 400px" />
                </div>
                <time className="news-date" dateTime={n.date}>
                  {n.date.replaceAll("-", ".")}
                </time>
                <p>{n.text}</p>
              </li>
            ))
          : Array.from({ length: PLACEHOLDER_SLIDES }, (_, i) => (
              <li key={i}>
                <div className="image-wrapper" />
                <span className="news-date">YYYY.MM.DD</span>
                <p>Sample title {i + 1}</p>
              </li>
            ))}
      </ul>
      {count > 1 && (
        <div className="news-controls">
          <div className="news-dots">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1} / ${count}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="news-arrows">
            <button
              type="button"
              aria-label={labels.prev}
              disabled={index === 0}
              onClick={() => go(index - 1)}
            >
              <Arrow d="M15 9H3M8 4 3 9l5 5" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              disabled={index === count - 1}
              onClick={() => go(index + 1)}
            >
              <Arrow d="M3 9h12M10 4l5 5-5 5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
