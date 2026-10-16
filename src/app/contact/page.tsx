import { LAB } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="container page-top">
      <section className="section">
        <h3 className="section-title">Contact</h3>
        <p className="prose">
          {LAB.address}
          <br />
          <a href={`mailto:${LAB.email}`} className="accent">
            {LAB.email}
          </a>
          <br />
          {LAB.phone}
        </p>
        {LAB.mapEmbed && (
          <iframe
            src={LAB.mapEmbed}
            title="Lab location map"
            loading="lazy"
            className="mt-8 w-full aspect-[4/3] px-4"
          />
        )}
      </section>

      <section className="section">
        <h3 className="section-title">How to apply</h3>
        <p className="prose">
          Email{" "}
          <a href={`mailto:${LAB.email}`} className="accent font-semibold">
            {LAB.email}
          </a>{" "}
          with your CV and a short note on what you would like to work on.
        </p>
      </section>
    </div>
  );
}
