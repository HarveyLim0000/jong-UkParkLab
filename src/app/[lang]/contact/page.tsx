import type { Metadata } from "next";
import { LAB } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.nav.contact };
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang, t } = await getDictionary(params);
  const { lat, lng } = LAB.location;
  const place = encodeURIComponent(LAB.mapPlace);

  return (
    <div className="container page-top">
      <section className="section">
        <h3 className="section-title">{t.nav.contact}</h3>
        <div className="contact-info">
          <div>
            <dl className="facts">
              <dt>{t.contact.lab}</dt>
              <dd>
                {LAB.name} · {LAB.department[lang]}
              </dd>
              <dt>{t.contact.address}</dt>
              <dd>{LAB.address[lang]}</dd>
              <dt>{t.contact.email}</dt>
              <dd>
                <a href={`mailto:${LAB.email}`} className="accent">
                  {LAB.email}
                </a>
              </dd>
              <dt>{t.contact.phone}</dt>
              <dd>
                <a href={`tel:${LAB.phone.en}`} className="accent">
                  {LAB.phone[lang]}
                </a>
              </dd>
              <dt>{t.contact.map}</dt>
              <dd>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent"
                >
                  {t.contact.openMap}{" "}
                  <span className="link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </dd>
            </dl>
            <p className="contact-inquiries">{t.contact.inquiries}</p>
          </div>
          {/* the map fills the height of the details beside it */}
          <div className="contact-map-cell">
            <iframe
              src={`https://www.google.com/maps?q=${place}&ll=${lat},${lng}&z=17&hl=${lang}&output=embed`}
              title={t.contact.mapTitle}
              loading="lazy"
              className="contact-map"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">{t.contact.positions}</h3>
        {/* the same recruiting lines as the home page */}
        <p className="prose">
          {t.home.recruitBeforeName}
          {LAB.name}
          {t.home.recruitAfterName}
          <br />
          {t.home.recruitWelcome}
        </p>
        <div className="apply-roles">
          <div>
            <h4>{t.contact.graduate}</h4>
            <p>{t.contact.graduateSend}</p>
          </div>
          <div>
            <h4>{t.contact.undergrad}</h4>
            <p>{t.contact.undergradSend}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">{t.contact.howToApply}</h3>
        <ol className="apply-steps">
          {t.contact.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
