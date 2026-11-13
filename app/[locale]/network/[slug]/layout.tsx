import {getTranslations} from "next-intl/server";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {getClinic} from "@/content/clinics";

export default async function ProfileLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const clinic = getClinic(slug);
  if (!clinic?.profileAvailable) return children;
  const t = await getTranslations({locale, namespace: "seo"});
  const network = await getTranslations({locale, namespace: "networkPage"});
  return <>
    <Breadcrumbs locale={locale} items={[
      {name: t("home"), path: ""},
      {name: network("directoryLabel"), path: "/network"},
      {name: clinic.practitioner, path: `/network/${slug}`}
    ]} />
    {children}
  </>;
}
