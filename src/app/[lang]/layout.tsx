import type { Metadata } from "next";
import Image from "next/image";
import { Lora, Noto_Serif_KR } from "next/font/google";
import Nav from "@/components/nav";
import { LAB } from "@/lib/content";
import { getDictionary, NAV_LABELS } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// Hangul fallback for Lora, so Korean text stays serif. There is no Korean
// subset to preload; the browser fetches only the unicode-range slices a page uses.
const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  preload: false,
  display: "swap",
});

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await getDictionary(params);
  return {
    title: { default: LAB.shortName, template: `%s · ${LAB.shortName}` },
    description: LAB.tagline[lang],
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang, t } = await getDictionary(params);

  return (
    <html
      lang={lang}
      className={`${lora.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav lang={lang} labels={NAV_LABELS} />

        <main className="flex-1">{children}</main>

        <footer className="site-footer py-8">
          <div className="container grid gap-6 sm:grid-cols-3 sm:items-center">
            <div className="footer-text">
              <p className="footer-label font-semibold">{t.footer.address}</p>
              {LAB.addressLines[lang].map((line) => (
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
