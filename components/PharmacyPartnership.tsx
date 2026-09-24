import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import {pharmacyPartnership} from "@/content/pharmacy-partnership";

export function PharmacyPartnership({locale}: {locale: string}) {
  const copy = pharmacyPartnership[locale] ?? pharmacyPartnership.de;
  return <section className="section pharmacy-partnership" id="burg-pharmacy" aria-labelledby="pharmacy-title">
    <div className="container">
      <div className="pharmacy-cooperation">
        <div className="pharmacy-copy">
          <span className="eyebrow">{copy.label}</span><h2 className="section-title" id="pharmacy-title">{copy.title}</h2>
          <p>{copy.intro}</p><p>{copy.body}</p>
          <Image className="pharmacy-logo" src="/images/burg-pharmacy/logo.webp" width={900} height={306} alt="Burg-Pharmacy LAB" />
          <div className="pharmacy-actions"><a className="pharmacy-source" href="https://rezeptur.de/pages/intensivierte-kooperation" target="_blank" rel="noopener noreferrer">{copy.learn}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
        <figure className="pharmacy-portrait">
          <Image src="/images/burg-pharmacy/uwe-rose.webp" width={479} height={567} alt={copy.person} sizes="(max-width: 767px) 80vw, 360px" />
          <figcaption><strong>{copy.person}</strong><span>{copy.role}</span></figcaption>
        </figure>
      </div>
    </div>
  </section>;
}
