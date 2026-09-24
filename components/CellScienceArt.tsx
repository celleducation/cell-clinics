import Image from "next/image";

const labels: Record<string, {note: string; regulation: string; digestion: string}> = {
  de: {note: "Schematische Illustration", regulation: "Zelluläre Regulation", digestion: "Verdauung & Nährstoffaufnahme"},
  en: {note: "Schematic illustration", regulation: "Cellular regulation", digestion: "Digestion & nutrient absorption"},
  es: {note: "Ilustración esquemática", regulation: "Regulación celular", digestion: "Digestión y absorción de nutrientes"}
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
  return <div className="cell-science-learning">
    {[{image: "cell-regulation", caption: text.regulation}, {image: "digestion", caption: text.digestion}].map(item => <figure key={item.image}>
      <Image src={`/images/cell-science/${item.image}.webp`} alt="" width={1400} height={788} sizes="(max-width: 767px) 92vw, 46vw" />
      <figcaption><span>{item.caption}</span><small>{text.note}</small></figcaption>
    </figure>)}
  </div>;
}
