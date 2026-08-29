import Image from "next/image";
import { ALBUMS } from "@/lib/content";

export const metadata = { title: "Gallery" };

export default function Gallery() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-3xl">Gallery</h1>

      {ALBUMS.length === 0 && (
        <p className="mt-6 text-muted">Photos will be posted here.</p>
      )}

      {ALBUMS.map((album) => (
        <section key={album.slug} className="pt-14">
          <h2 className="text-xl">{album.title}</h2>
          <p className="mt-1 text-sm text-muted">{album.date}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {album.photos.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="rounded-card border border-line w-full h-auto"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
