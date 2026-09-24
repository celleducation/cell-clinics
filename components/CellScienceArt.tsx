import Image from "next/image";

const labels: Record<string, {note: string; regulation: string; digestion: string; ageing: string; membrane: string}> = {
  de: {note: "Schematische Illustrationen", regulation: "Zelluläre Regulation", digestion: "Verdauung & Nährstoffaufnahme", ageing: "Zellalterung", membrane: "Transport durch Zellmembranen"},
  en: {note: "Schematic illustrations", regulation: "Cellular regulation", digestion: "Digestion & nutrient absorption", ageing: "Cellular ageing", membrane: "Transport across cell membranes"},
  es: {note: "Ilustraciones esquemáticas", regulation: "Regulación celular", digestion: "Digestión y absorción de nutrientes", ageing: "Envejecimiento celular", membrane: "Transporte a través de membranas celulares"}
};

export function CellScienceArt({kind, locale}: {kind: "senescence" | "membrane-transport"; locale: string}) {
  const text = labels[locale] ?? labels.de;
  return <figure className="cell-science-art">
    <Image src={`/images/cell-science/${kind}.webp`} alt="" width={1400} height={kind === "senescence" ? 731 : 808} sizes="(max-width: 767px) 92vw, 46vw" />
    <figcaption>{text.note}</figcaption>
  </figure>;
}

export function CellScienceLearning({locale}: {locale: string}) {
  const text = labels[locale] ?? labels.de;
  return <div className="patient-science-gallery">
    <div className="patient-science-grid">
    {[{image: "senescence", caption: text.ageing}, {image: "cell-regulation", caption: text.regulation}, {image: "digestion", caption: text.digestion}, {image: "membrane-transport", caption: text.membrane}].map(item => <figure key={item.image}>
      <Image src={`/images/cell-science/${item.image}.webp`} alt="" width={1400} height={788} sizes="(max-width: 600px) 44vw, 23vw" />
      <figcaption>{item.caption}</figcaption>
    </figure>)}
    </div>
    <p className="patient-science-note">{text.note}</p>
  </div>;
}
