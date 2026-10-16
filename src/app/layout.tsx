import type { Metadata } from "next";
import Image from "next/image";
import { Lora } from "next/font/google";
import Nav from "@/components/nav";
import { LAB } from "@/lib/content";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: LAB.shortName, template: `%s · ${LAB.shortName}` },
  description: LAB.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />

        <main className="flex-1">{children}</main>

        <footer className="site-footer py-8">
          <div className="container grid gap-6 sm:grid-cols-3 sm:items-center">
            <div className="footer-text">
              <p className="footer-label font-semibold">Address.</p>
              {LAB.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="footer-text sm:text-center">
              © 2026 {LAB.name} All rights reserved.
            </p>
            <div className="sm:justify-self-end sm:mr-8">
              <Image
                src="/images/logo.png"
                alt={LAB.shortName}
                className="footer-logo"
                width={921}
                height={240}
                sizes="(max-width: 480px) 90px, 135px"
              />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
