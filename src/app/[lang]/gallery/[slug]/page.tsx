import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALBUMS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localize } from "@/lib/locales";

// one page per album; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ slug: a.slug }));
}

async function getAlbum(params: PageProps<"/[lang]/gallery/[slug]">["params"]) {
  const { slug } = await params;
  const album = ALBUMS.find((a) => a.slug === slug);
  if (!album) notFound();
  return album;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery/[slug]">): Promise<Metadata> {
  const { lang } = await getDictionary(params);
  const album = await getAlbum(params);
  return { title: album.title[lang] };
}

/** Every photo of one event; each opens full size in a new tab. */
export default async function Album({ params }: PageProps<"/[lang]/gallery/[slug]">) {
  const { lang, t } = await getDictionary(params);
  const album = await getAlbum(params);

  return (
    <div className="container page-top">
      <section className="section">
        <Link href={localize(lang, "/gallery")} className="back-link">
          ← {t.nav.gallery}
        </Link>
        <h3 className="section-title tight">{album.title[lang]}</h3>
        <p className="album-meta album-header-meta">
          {album.date.replaceAll("-", ".")} · {t.gallery.photoCount(album.photos.length)}
        </p>
        <div className="grid-3">
          {album.photos.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="image-wrapper">
              <Image
                src={src}
                alt={`${album.title[lang]} ${i + 1}`}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 340px"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
