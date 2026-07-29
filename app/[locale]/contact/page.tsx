import {Mail} from "lucide-react";
import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {PartnerApplicationForm} from "@/components/PartnerApplicationForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Cell Clinics or submit a partnership inquiry."
};

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return <><PageHero eyebrow={t("contactPage.eyebrow")} title={t("contactPage.title")} lead={t("contactPage.lead")}/><section className="section"><div className="container contact-stack"><div className="contact-card card"><Mail size={26}/><div><span>{t("contactPage.emailLabel")}</span><a href="mailto:info@cell-education.com">info@cell-education.com</a></div></div><div id="inquiry"><PartnerApplicationForm /></div></div></section></>;
}
