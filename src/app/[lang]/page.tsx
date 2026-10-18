import Link from "next/link";
import Ecg from "@/components/ecg";
import NewsCarousel from "@/components/news-carousel";
import { LAB, TOPICS, NEWS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localize } from "@/lib/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang, t } = await getDictionary(params);
  const latest = NEWS.slice(0, 5);

  return (
    <>
      <div className="container">
        <section className="hero-text">
          <div className="hero-intro">
            <h1>{LAB.name}</h1>
            <h3>{LAB.tagline[lang]}</h3>
            <p className="prose">
              <strong>
                <em>{LAB.welcomeLead[lang]}</em>
              </strong>
              {LAB.welcome[lang]}
            </p>
          </div>
          <NewsCarousel
            items={latest}
            labels={{ title: t.home.news, prev: t.home.newsPrev, next: t.home.newsNext }}
          />
        </section>
      </div>

      <Ecg />

      <div className="container">
        {TOPICS.length > 0 && (
          <section className="section">
            <h3 className="section-title">{t.home.research}</h3>
            <div className="grid-3">
              {TOPICS.map((topic) => (
                <article key={topic.slug}>
                  <div className="image-wrapper" />
                  <div className="grid-item-date">{topic.title}</div>
                  <div className="grid-item-text">{topic.summary}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h3 className="section-title">{t.home.contact}</h3>
          <p className="prose">
            {t.home.recruitBeforeName}
            {LAB.name}
            {t.home.recruitAfterName}
            <br />
            {t.home.recruitWelcome}
            <br />
            {t.home.contactBeforeEmail}
            <a href={`mailto:${LAB.email}`} className="accent font-semibold">
              {LAB.email}
            </a>
            {t.home.contactBeforePhone}
            <a href={`tel:${LAB.phone.en}`} className="accent font-semibold">
              {LAB.phone[lang]}
            </a>
            <br />
            {t.home.contactBeforeLink}
            <Link href={localize(lang, "/contact")} className="accent">
              {t.home.contactLink}
            </Link>
            {t.home.contactAfterLink}
          </p>
        </section>
      </div>
    </>
  );
}
