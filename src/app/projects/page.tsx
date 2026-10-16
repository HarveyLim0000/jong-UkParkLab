import { PROJECTS } from "@/lib/content";

export const metadata = { title: "Projects" };

const GROUPS = [
  { status: "ongoing" as const, heading: "Ongoing" },
  { status: "completed" as const, heading: "Completed" },
];

export default function Projects() {
  return (
    <div className="container page-top">
      {PROJECTS.length === 0 && (
        <section className="section">
          <h3 className="section-title">Projects</h3>
          <p className="prose">Projects will be listed here.</p>
        </section>
      )}

      {GROUPS.map(({ status, heading }) => {
        const items = PROJECTS.filter((p) => p.status === status);
        if (!items.length) return null;
        return (
          <section key={status} className="section">
            <h3 className="section-title">{heading}</h3>
            <ul className="list">
              {items.map((p) => (
                <li key={p.title}>
                  {p.title}
                  <div className="meta">
                    {p.funder} · {p.period} · {p.role} Investigator
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
