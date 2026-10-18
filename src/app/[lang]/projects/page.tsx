import type { Metadata } from "next";
import Image from "next/image";
import { PROJECTS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.nav.projects };
}

const GROUPS = ["ongoing", "completed"] as const;

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const { lang, t } = await getDictionary(params);

  return (
    <div className="container page-top">
      {PROJECTS.length === 0 && (
        <section className="section">
          <h3 className="section-title">{t.nav.projects}</h3>
          <p className="prose">{t.projects.empty}</p>
        </section>
      )}

      {GROUPS.map((status) => {
        const items = PROJECTS.filter((p) => p.status === status);
        if (!items.length) return null;
        return (
          <section key={status} className="section">
            <h3 className="section-title">{t.projects[status]}</h3>
            <ul className="project-list">
              {items.map((p, i) => (
                <li key={i}>
                  <div className="project-text">
                    <div className="project-title">{p.title[lang]}</div>
                    {/* labelled facts, partner first: it names the project
                        until the title is in */}
                    <dl className="facts">
                      {p.partner && (
                        <>
                          <dt>{t.projects.partner}</dt>
                          <dd>{p.partner[lang]}</dd>
                        </>
                      )}
                      <dt>{t.projects.funder}</dt>
                      <dd>{p.funder[lang]}</dd>
                      <dt>{t.projects.period}</dt>
                      <dd>{p.period}</dd>
                      <dt>{t.projects.role}</dt>
                      <dd>{p.role[lang]}</dd>
                    </dl>
                    {p.summary && <p className="project-summary">{p.summary[lang]}</p>}
                  </div>
                  {/* a blank box holds the place until there is a photo */}
                  <div className="project-photo">
                    <div className="image-wrapper">
                      {p.image && (
                        <Image src={p.image} alt="" fill sizes="(max-width: 768px) 480px, 360px" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
