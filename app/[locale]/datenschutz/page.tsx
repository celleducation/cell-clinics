import {setRequestLocale} from "next-intl/server";
import {privacyCopy} from "@/content/privacy";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {pageMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const c = privacyCopy[locale as keyof typeof privacyCopy] ?? privacyCopy.en;
  return pageMetadata({locale, path: "/datenschutz", title: c.title, description: `${c.title} – Cell Clinics`});
}
export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const c = privacyCopy[locale as keyof typeof privacyCopy] ?? privacyCopy.en;
  return <>
    <Breadcrumbs locale={locale} items={[{name: c.home, path: ""}, {name: c.title, path: "/datenschutz"}]} />
    <section className="section"><div className="container">
      <h1 className="display">{c.title}</h1><p>{c.date}</p>
      <p>{c.gtmNotice}</p>
      {c.sections.map(([title, body]) => <section key={title}><h2 className="section-title">{title}</h2><p>{body}</p></section>)}
    </div></section>
  </>;
}
