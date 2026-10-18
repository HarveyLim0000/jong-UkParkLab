import type { Metadata } from "next";
import Image from "next/image";
import { MEMBERS, type CvEntry, type Member } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/members">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.nav.members };
}

const GROUPS = ["postdoc", "phd", "ms", "undergrad", "alumni"] as const;

function ExternalLink({ href, label }: { href?: string; label: string }) {
  const text = (
    <>
      {label}{" "}
      <span className="link-arrow" aria-hidden="true">
        ↗
      </span>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  ) : (
    // holds the link's place, in grey, until its address is in
    <span className="link-pending" aria-hidden="true">
      {text}
    </span>
  );
}

/** Email (the PI's), GitHub on every profile, Google Scholar when there is one. */
function MemberLinks({ m }: { m: Member }) {
  return (
    <div className="member-links">
      {m.email && <a href={`mailto:${m.email}`}>{m.email}</a>}
      <ExternalLink href={m.github} label="GitHub" />
      {m.scholar && <ExternalLink href={m.scholar} label="Google Scholar" />}
    </div>
  );
}

/** Portrait (a blank box until there is a photo), name, a grey note, research, links. */
function MemberCard({ m, lang }: { m: Member; lang: Locale }) {
  // alumni carry degree, year and current position where others carry a program
  const note =
    m.role === "alumni"
      ? [m.degree?.[lang], m.year, m.now?.[lang]].filter(Boolean).join(" · ")
      : m.program?.[lang];

  return (
    <article>
      <div className="image-wrapper portrait">
        {m.photo && (
          <Image
            src={m.photo}
            alt={m.name[lang]}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 240px"
          />
        )}
      </div>
      <div className="grid-item-date">{m.name[lang]}</div>
      {note && <div className="member-program">{note}</div>}
      {m.research && <p className="member-research">{m.research[lang]}</p>}
      <MemberLinks m={m} />
    </article>
  );
}

function CvList({ title, entries, lang }: { title: string; entries?: CvEntry[]; lang: Locale }) {
  if (!entries?.length) return null;
  return (
    <div>
      <h4 className="cv-title">{title}</h4>
      <ul className="cv-list">
        {entries.map((e, i) => (
          <li key={i}>
            <span className="cv-years">{typeof e.years === "string" ? e.years : e.years[lang]}</span>
            <span>{e.text[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Members({ params }: PageProps<"/[lang]/members">) {
  const { lang, t } = await getDictionary(params);
  const professors = MEMBERS.filter((m) => m.role === "professor");

  return (
    <div className="container page-top">
      {professors.length > 0 && (
        <section className="section">
          <h3 className="section-title">{t.members.professor}</h3>
          {professors.map((m) => (
            <div key={m.name.en} className="pi">
              <div className="pi-photo">
                <div className="image-wrapper portrait">
                  {m.photo && (
                    <Image src={m.photo} alt={m.name[lang]} fill sizes="(max-width: 768px) 200px, 260px" />
                  )}
                </div>
              </div>
              <div className="pi-info">
                <div className="pi-name">{m.name[lang]}</div>
                {m.affiliation && <div className="member-program">{m.affiliation[lang]}</div>}
                {m.research && <p className="member-research">{m.research[lang]}</p>}
                <MemberLinks m={m} />
                <div className="pi-cv">
                  <CvList title={t.members.education} entries={m.education} lang={lang} />
                  <CvList title={t.members.career} entries={m.career} lang={lang} />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {GROUPS.map((role) => {
        const people = MEMBERS.filter((m) => m.role === role);
        if (!people.length) return null;
        return (
          <section key={role} className="section">
            <h3 className="section-title">{t.members[role]}</h3>
            <div className="member-grid">
              {people.map((m) => (
                <MemberCard key={m.name.en} m={m} lang={lang} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
