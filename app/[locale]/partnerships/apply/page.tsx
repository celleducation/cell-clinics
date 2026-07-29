import {getTranslations, setRequestLocale} from "next-intl/server";
import {PartnerApplicationForm} from "@/components/PartnerApplicationForm";

export default async function ApplyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <section className="section application-page section-soft">
      <div className="container application-shell">
        <div className="application-intro">
          <span className="eyebrow">{t("form.label")}</span>
          <h1 className="page-title">{t("form.title")}</h1>
          <p className="lead">{t("form.body")}</p>
          <p>{t("form.note")}</p>
        </div>
        <PartnerApplicationForm />
      </div>
    </section>
  );
}
