import Image from "next/image";
import { ALBUMS } from "@/lib/content";

export const metadata = { title: "Gallery" };

export default function Gallery() {
  return (
    <div className="container page-top">
      {ALBUMS.length === 0 && (
        <section className="section">
          <h3 className="section-title">Gallery</h3>
          <p className="prose">Photos will be posted here.</p>
        </section>
      )}

      {ALBUMS.map((album) => (
        <section key={album.slug} className="section">
          <h3 className="section-title">{album.title}</h3>
          <div className="grid-3">
            {album.photos.map((photo) => (
              <div key={photo.src} className="image-wrapper">
                <Image src={photo.src} alt={photo.alt} width={800} height={600} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
