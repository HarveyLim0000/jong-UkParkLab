import { PUBLICATIONS, LAB_AUTHORS, type Publication } from "@/lib/content";

export const metadata = { title: "Publications" };

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
          {"\u00A0"}
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
      <div className="meta italic">
        {p.venue}, {p.year}
      </div>
    </li>
  );
}

export default function Publications() {
  const highlights = PUBLICATIONS.filter((p) => p.highlight);
  const years = [...new Set(PUBLICATIONS.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="container page-top">
      {highlights.length > 0 && (
        <section className="section">
          <h3 className="section-title tight">Selected</h3>
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
