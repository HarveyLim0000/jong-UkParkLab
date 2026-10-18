import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALBUMS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localize } from "@/lib/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.nav.gallery };
}

// until the first album is in, sample cards show where each part will sit
const PLACEHOLDER_ALBUMS = 3;

/** Events by year, newest first; each card opens the event's own page. */
export default async function Gallery({ params }: PageProps<"/[lang]/gallery">) {
  const { lang, t } = await getDictionary(params);
  const albums = [...ALBUMS].sort((a, b) => b.date.localeCompare(a.date));
  const years = [...new Set(albums.map((a) => a.date.slice(0, 4)))];

  return (
    <div className="container page-top">
      {albums.length === 0 && (
        <section className="section">
          <h3 className="section-title">YYYY</h3>
          <div className="grid-3">
            {Array.from({ length: PLACEHOLDER_ALBUMS }, (_, i) => (
              <article key={i}>
                <div className="image-wrapper" />
                <div className="grid-item-date">{t.gallery.sampleTitle}</div>
                <div className="album-meta">{t.gallery.sampleMeta}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {years.map((year) => (
        <section key={year} className="section">
          <h3 className="section-title">{year}</h3>
          <div className="grid-3">
            {albums
              .filter((a) => a.date.startsWith(year))
              .map((a) => (
                <Link key={a.slug} href={localize(lang, `/gallery/${a.slug}`)} className="album-card">
                  <div className="image-wrapper">
                    {a.photos[0] && (
                      // the title below names the link
                      <Image
                        src={a.photos[0]}
                        alt=""
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 340px"
                      />
                    )}
                  </div>
                  <div className="grid-item-date">{a.title[lang]}</div>
                  <div className="album-meta">
                    {a.date.replaceAll("-", ".")} · {t.gallery.photoCount(a.photos.length)}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
