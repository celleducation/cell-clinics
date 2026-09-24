import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import {pharmacyPartnership} from "@/content/pharmacy-partnership";

export function PharmacyPartnership({locale}: {locale: string}) {
  const copy = pharmacyPartnership[locale] ?? pharmacyPartnership.de;
  return <section className="section pharmacy-partnership" id="burg-pharmacy" aria-labelledby="pharmacy-title">
    <div className="container">
      <div className="pharmacy-intro">
        <div><span className="eyebrow">{copy.label}</span><h2 className="section-title" id="pharmacy-title">{copy.title}</h2><p>{copy.intro}</p></div>
        <div className="pharmacy-person">
          <Image src="/images/burg-pharmacy/logo.webp" width={900} height={306} alt="Burg-Pharmacy LAB" />
          <h3>{copy.person}</h3><span>{copy.role}</span><p>{copy.biography}</p>
        </div>
      </div>
      <div className="pharmacy-pillars">{copy.pillars.map((item, i) => <article key={item.title}><span aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      <div className="pharmacy-actions"><a className="button button-primary" href="mailto:beratung@cell-education.com">{copy.contact}<ArrowUpRight size={18} aria-hidden="true" /></a><a className="pharmacy-source" href="https://rezeptur.de/pages/intensivierte-kooperation" target="_blank" rel="noopener noreferrer">{copy.learn}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
      <p className="pharmacy-note">{copy.note}</p>
    </div>
  </section>;
}
