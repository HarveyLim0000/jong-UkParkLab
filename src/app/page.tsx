import Link from "next/link";
import Ecg from "@/components/ecg";
import { LAB, TOPICS, NEWS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <div className="container">
        <section className="hero-text">
          <h1>{LAB.name}</h1>
          <h3>{LAB.tagline}</h3>
        </section>
      </div>

      <Ecg />

      <div className="container">
        <section className="section">
          <p className="prose">
            <strong>
              <em>{LAB.welcomeLead}</em>
            </strong>{" "}
            {LAB.welcome}
          </p>
        </section>

        {TOPICS.length > 0 && (
          <section className="section">
            <h3 className="section-title">Research</h3>
            <div className="grid-3">
              {TOPICS.map((t) => (
                <article key={t.slug}>
                  <div className="image-wrapper" />
                  <div className="grid-item-date">{t.title}</div>
                  <div className="grid-item-text">{t.summary}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {NEWS.length > 0 && (
          <section className="section">
            <h3 className="section-title">News</h3>
            <div className="grid-3">
              {NEWS.map((n) => (
                <article key={n.date + n.text}>
                  <div className="image-wrapper" />
                  <div className="grid-item-date">{n.date}</div>
                  <div className="grid-item-text">{n.text}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h3 className="section-title">Contact</h3>
          <p className="prose">
            If you would like to join the lab, collaborate on a research project, or
            have any question about our work, please contact us at{" "}
            <a href={`mailto:${LAB.email}`} className="accent font-semibold">
              {LAB.email}
            </a>
            . Details on open positions are on the{" "}
            <Link href="/contact" className="accent">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </>
  );
}
