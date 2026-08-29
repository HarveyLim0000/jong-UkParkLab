import { PUBLICATIONS, LAB_AUTHORS, type Publication } from "@/lib/content";

export const metadata = { title: "Publications" };

function Authors({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((a, i) => (
        <span key={`${a}-${i}`}>
          {LAB_AUTHORS.includes(a) ? <strong>{a}</strong> : a}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );
}

function Entry({ p }: { p: Publication }) {
  return (
    <li className="py-4">
      <p className="font-medium">
        {p.doi ? (
          <a
            href={`https://doi.org/${p.doi}`}
            className="text-navy-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </p>
      <p className="mt-1 text-sm text-muted">
        <Authors authors={p.authors} />
      </p>
      <p className="text-sm text-muted italic">
        {p.venue}, {p.year}
      </p>
    </li>
  );
}

export default function Publications() {
  const highlights = PUBLICATIONS.filter((p) => p.highlight);
  const years = [...new Set(PUBLICATIONS.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-3xl">Publications</h1>

      {highlights.length > 0 && (
        <section className="pt-12">
          <h2 className="text-xl">Selected</h2>
          <ul className="mt-4 border-t border-line divide-y divide-line">
            {highlights.map((p) => (
              <Entry key={p.title} p={p} />
            ))}
          </ul>
        </section>
      )}

      {years.map((year) => (
        <section key={year} className="pt-12">
          <h2 className="text-xl">{year}</h2>
          <ul className="mt-4 border-t border-line divide-y divide-line">
            {PUBLICATIONS.filter((p) => p.year === year).map((p) => (
              <Entry key={p.title} p={p} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
