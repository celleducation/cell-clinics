import {getClinic} from "@/content/clinics";
import {professionLabel} from "@/content/professions";

export default async function ProfileLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const clinic = getClinic(slug);
  return <>{clinic?.profileAvailable && <div className="container"><p className="eyebrow">{professionLabel(clinic.berufsgruppe, locale)}</p></div>}{children}</>;
}
