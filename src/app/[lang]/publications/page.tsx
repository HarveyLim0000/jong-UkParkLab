import type { Metadata } from "next";
import { PUBLICATIONS, LAB_AUTHORS, type Publication } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/publications">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.nav.publications };
}

function Entry({ p }: { p: Publication }) {
  return (
    <li>
      {p.doi ? (
        <a
          href={`https://doi.org/${p.doi}`}
          className="accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          {p.title}
          {" "}
          <span className="link-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        p.title
      )}
      <div className="meta">
        {p.authors.map((a, i) => (
          <span key={`${a}-${i}`}>
            {LAB_AUTHORS.includes(a) ? <strong>{a}</strong> : a}
            {i < p.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div className="meta">
        <span className="italic">
          {p.venue}, {p.year}
        </span>
        {p.doi && (
          <>
            {" · "}
            <a
              href={`https://doi.org/${p.doi}`}
              className="accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI: {p.doi}
            </a>
          </>
        )}
      </div>
    </li>
  );
}

export default async function Publications({ params }: PageProps<"/[lang]/publications">) {
  const { t } = await getDictionary(params);
  const highlights = PUBLICATIONS.filter((p) => p.highlight);
  const years = [...new Set(PUBLICATIONS.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="container page-top">
      {highlights.length > 0 && (
        <section className="section">
          <h3 className="section-title tight">{t.publications.selected}</h3>
          <ul className="list">
            {highlights.map((p) => (
              <Entry key={p.title} p={p} />
            ))}
          </ul>
        </section>
      )}

      {years.map((year) => (
        <section key={year} className="section">
          <h3 className="section-title tight">{year}</h3>
          <ul className="list">
            {PUBLICATIONS.filter((p) => p.year === year).map((p) => (
              <Entry key={p.title} p={p} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
