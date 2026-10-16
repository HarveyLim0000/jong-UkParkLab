import Image from "next/image";
import { MEMBERS, type Member } from "@/lib/content";

export const metadata = { title: "Members" };

const GROUPS: { role: Member["role"]; heading: string }[] = [
  { role: "professor", heading: "Principal Investigator" },
  { role: "postdoc", heading: "Postdoctoral Researchers" },
  { role: "phd", heading: "Ph.D. Students" },
  { role: "ms", heading: "M.S. Students" },
];

export default function Members() {
  const alumni = MEMBERS.filter((m) => m.role === "alumni");

  return (
    <div className="container page-top">
      {GROUPS.map(({ role, heading }) => {
        const people = MEMBERS.filter((m) => m.role === role);
        if (!people.length) return null;
        return (
          <section key={role} className="section">
            <h3 className="section-title">{heading}</h3>
            <div className="grid-3">
              {people.map((m, i) => (
                <article key={`${m.name}-${i}`}>
                  <div className="image-wrapper portrait">
                    {m.photo && (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 300px"
                      />
                    )}
                  </div>
                  <div className="grid-item-date">{m.name}</div>
                  <div className="grid-item-text">{m.title}</div>
                  {m.interests && <div className="grid-item-text mt-2">{m.interests}</div>}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="grid-item-text accent block mt-2">
                      {m.email}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {alumni.length > 0 && (
        <section className="section">
          <h3 className="section-title">Alumni</h3>
          <ul className="list">
            {alumni.map((m, i) => (
              <li key={`${m.name}-${i}`}>
                {m.name}
                <div className="meta">
                  {m.degree} {m.year} · {m.now}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
