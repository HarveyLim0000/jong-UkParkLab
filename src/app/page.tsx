import Link from "next/link";
import { LAB, TOPICS, PUBLICATIONS } from "@/lib/content";

export default function Home() {
  const recent = [...PUBLICATIONS].sort((a, b) => b.year - a.year).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-16 pb-10">
        <h1 className="text-3xl sm:text-4xl max-w-3xl">{LAB.name}</h1>
        <p className="mt-5 text-lg text-muted max-w-2xl">{LAB.tagline}</p>
      </section>

      {/* Replace with <video autoPlay muted loop playsInline poster="…" src="…" /> */}
      <figure className="aspect-[16/7] rounded-card bg-surface border border-line grid place-items-center">
        <figcaption className="text-sm text-muted">
          Hero video or image — 1600×700 or wider
        </figcaption>
      </figure>

      <section className="pt-20">
        <h2 className="text-2xl">Research</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <article key={t.slug}>
              <div className="aspect-[4/3] rounded-card bg-surface border border-line" />
              <h3 className="mt-4 text-lg">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl">Recent Publications</h2>
          <Link href="/publications" className="text-sm text-navy-700 underline">
            All publications
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {recent.map((p) => (
            <li key={p.title} className="py-4">
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted">
                {p.venue}, {p.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-20">
        <h2 className="text-2xl">Join the lab</h2>
        <p className="mt-3 text-muted max-w-2xl">
          We are looking for graduate students and postdoctoral researchers.{" "}
          <Link href="/contact" className="text-navy-700 underline">
            See how to apply
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
