import type { Metadata } from "next";
import { LAB } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { t } = await getDictionary(params);
  return { title: t.privacy.title };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { t } = await getDictionary(params);

  return (
    <div className="container page-top">
      <section className="section">
        <h3 className="section-title">{t.privacy.title}</h3>
        <p className="prose">{t.privacy.noCollection}</p>
        <p className="prose mt-6">{t.privacy.hosting}</p>
        <p className="prose mt-6">
          {t.privacy.questions}
          <a href={`mailto:${LAB.email}`} className="accent">
            {LAB.email}
          </a>
        </p>
        <p className="prose mt-6 text-base">{t.privacy.updated}</p>
      </section>
    </div>
  );
}
