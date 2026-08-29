import { PROJECTS } from "@/lib/content";

export const metadata = { title: "Projects" };

export default function Projects() {
  const groups = [
    { status: "ongoing" as const, heading: "Ongoing" },
    { status: "completed" as const, heading: "Completed" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-3xl">Projects</h1>

      {groups.map(({ status, heading }) => {
        const items = PROJECTS.filter((p) => p.status === status);
        if (!items.length) return null;
        return (
          <section key={status} className="pt-14">
            <h2 className="text-xl">{heading}</h2>
            <ul className="mt-6 border-t border-line divide-y divide-line">
              {items.map((p) => (
                <li key={p.title} className="py-5">
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {p.funder} · {p.period} · {p.role} Investigator
                  </p>
                  <p className="mt-2 text-sm">{p.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
