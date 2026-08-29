import { LAB } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-3xl">Contact</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="text-xl">Location</h2>
          <p className="mt-3 text-muted">
            {LAB.affiliation}
            <br />
            {LAB.address}
          </p>
          <p className="mt-4">
            <a href={`mailto:${LAB.email}`} className="text-navy-700 underline">
              {LAB.email}
            </a>
            <br />
            <span className="text-muted">{LAB.phone}</span>
          </p>

          {LAB.mapEmbed && (
            <iframe
              src={LAB.mapEmbed}
              title="Lab location map"
              loading="lazy"
              className="mt-6 w-full aspect-[4/3] rounded-card border border-line"
            />
          )}
        </section>

        <section>
          <h2 className="text-xl">How to apply</h2>
          <dl className="mt-4 space-y-5">
            <div>
              <dt className="font-medium">Open positions</dt>
              <dd className="text-muted">TODO: Ph.D. / M.S. / postdoc — which and how many.</dd>
            </div>
            <div>
              <dt className="font-medium">Background we look for</dt>
              <dd className="text-muted">TODO: majors, skills, prior experience.</dd>
            </div>
            <div>
              <dt className="font-medium">How to apply</dt>
              <dd className="text-muted">
                TODO: what to send (CV, transcript, statement) and the admission
                deadlines.
              </dd>
            </div>
          </dl>
          <p className="mt-6">
            Email{" "}
            <a href={`mailto:${LAB.email}`} className="text-navy-700 underline">
              {LAB.email}
            </a>{" "}
            with your CV and a short note on what you would like to work on.
          </p>
        </section>
      </div>
    </div>
  );
}
