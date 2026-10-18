"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LAB } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { LOCALES, LOCALE_LABELS, localize, type Locale } from "@/lib/locales";

const LINKS = [
  { path: "/", key: "home" },
  { path: "/members", key: "members" },
  { path: "/projects", key: "projects" },
  { path: "/publications", key: "publications" },
  { path: "/gallery", key: "gallery" },
  { path: "/contact", key: "contact" },
] as const;

type NavLabels = Record<Locale, Dictionary["nav"]>;

/**
 * KR / EN text pair, the form Korean lab sites use. The current language is
 * black, the other a grey link to the same page in that language. Only the
 * colour changes, so the letters never move.
 */
function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <div className="lang-toggle" role="group" aria-label={label}>
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span className="lang-sep" aria-hidden="true">
              /
            </span>
          )}
          {l === lang ? (
            <span className="lang-current" lang={l} aria-current="true">
              {LOCALE_LABELS[l]}
            </span>
          ) : (
            <Link
              href={pathname.replace(/^\/[^/]+/, `/${l}`)}
              hrefLang={l}
              lang={l}
              scroll={false}
            >
              {LOCALE_LABELS[l]}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function Nav({ lang, labels }: { lang: Locale; labels: NavLabels }) {
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "site-nav",
        scrolled || open ? "scrolled" : "",
        open ? "open" : "",
      ].join(" ")}
      aria-label="Main"
    >
      <div className="nav-inner">
        <Link href={localize(lang, "/")} className="nav-logo">
          <Image
            src="/images/logo.png"
            alt={LAB.shortName}
            className="logo"
            width={921}
            height={240}
            sizes="(max-width: 480px) 80px, 120px"
            priority
          />
        </Link>
        <LangToggle lang={lang} label={labels[lang].language} />
        <button
          type="button"
          className="nav-toggle"
          aria-label={labels[lang].menu}
          aria-expanded={open}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links">
          <div className="nav-row">
            {LINKS.map(({ path, key }) => (
              <Link key={path} href={localize(lang, path)}>
                {labels[lang][key]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
