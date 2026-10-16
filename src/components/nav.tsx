"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LAB } from "@/lib/content";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/members", label: "Members" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
        <Link href="/">
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
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
