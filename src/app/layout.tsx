import type { Metadata } from "next";
import Link from "next/link";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import Nav from "@/components/nav";
import { LAB } from "@/lib/content";
import "./globals.css";

const heading = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: LAB.name, template: `%s · ${LAB.name}` },
  description: LAB.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <Link href="/" className="font-serif text-lg font-semibold text-navy-900">
              {LAB.name}
            </Link>
            <Nav />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line mt-24">
          <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted flex flex-col gap-2 sm:flex-row sm:justify-between">
            <p>
              {LAB.name}, {LAB.affiliation}
              <br />
              {LAB.address}
            </p>
            <p className="sm:text-right">
              <a href={`mailto:${LAB.email}`} className="underline hover:text-navy-700">
                {LAB.email}
              </a>
              <br />
              <Link href="/privacy" className="underline hover:text-navy-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
