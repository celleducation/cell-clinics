import Image from "next/image";

const copy = {
  de: {definition: "Bionic Cell Therapy ist ein Behandlungskonzept, das die Zellfunktion unterstützt. Es werden keine Zellen übertragen. Sie ist keine Stammzell-, Frischzell- oder Gentherapie.", note: "Cell Education steht für das Konzept und die Wissensvermittlung. Cell Clinics ist das Netzwerk der Partnerpraxen. Schulungen vermitteln keine Behandlungsbefugnis. Ärztliche Leistungen bleiben Ärztinnen und Ärzten vorbehalten."},
  en: {definition: "Bionic Cell Therapy is a treatment concept that supports cell function. No cells are transferred. It is not stem cell, fresh cell or gene therapy.", note: "Cell Education provides the concept and training. Cell Clinics is the partner practice network. Training does not confer authority to treat. Medical services reserved for physicians may only be provided by physicians."},
  es: {definition: "Bionic Cell Therapy es un concepto de tratamiento que apoya la función celular. No se transfieren células. No es una terapia con células madre, células frescas ni una terapia génica.", note: "Cell Education ofrece el concepto y los cursos. Cell Clinics es la red de consultas asociadas. Los cursos no otorgan autorización para tratar. Los servicios reservados a médicos solo pueden prestarlos médicos."}
};

export function MethodNotice({locale}: {locale: string}) {
  const c = copy[locale as keyof typeof copy] ?? copy.en;
  return <aside className="method-notice"><div className="container">
    <Image src="/images/cell-education-logo.svg" alt="Cell Education" width={220} height={54} />
    <h2>Bionic Cell Therapy</h2><p>{c.definition}</p><p>{c.note}</p>
  </div></aside>;
}
