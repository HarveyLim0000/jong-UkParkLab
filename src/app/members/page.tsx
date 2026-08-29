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
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-3xl">Members</h1>

      {GROUPS.map(({ role, heading }) => {
        const people = MEMBERS.filter((m) => m.role === role);
        if (!people.length) return null;
        return (
          <section key={role} className="pt-14">
            <h2 className="text-xl">{heading}</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((m, i) => (
                <article key={`${m.name}-${i}`}>
                  <div className="aspect-[3/4] rounded-card bg-surface border border-line" />
                  <h3 className="mt-4 text-lg">{m.name}</h3>
                  <p className="text-sm text-muted">{m.title}</p>
                  {m.interests && <p className="mt-2 text-sm">{m.interests}</p>}
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="mt-2 inline-block text-sm text-navy-700 underline"
                    >
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
        <section className="pt-14">
          <h2 className="text-xl">Alumni</h2>
          <table className="mt-6 w-full text-sm border-t border-line">
            <thead className="text-left text-muted">
              <tr>
                <th scope="col" className="py-3 font-medium">Name</th>
                <th scope="col" className="py-3 font-medium">Degree</th>
                <th scope="col" className="py-3 font-medium">Year</th>
                <th scope="col" className="py-3 font-medium">Current position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line border-t border-line">
              {alumni.map((m, i) => (
                <tr key={`${m.name}-${i}`}>
                  <td className="py-3">{m.name}</td>
                  <td className="py-3">{m.degree}</td>
                  <td className="py-3">{m.year}</td>
                  <td className="py-3 text-muted">{m.now}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
