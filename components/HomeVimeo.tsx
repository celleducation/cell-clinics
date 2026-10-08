"use client";

import {useState} from "react";
import Image from "next/image";
import {Play} from "lucide-react";

const copy = {
  de: {title: "Cell Clinics im Video", play: "Video laden und abspielen", note: "Erst mit Ihrem Klick wird eine Verbindung zu Vimeo hergestellt. Dabei werden Daten wie Ihre IP-Adresse an Vimeo übertragen.", external: "Direkt auf Vimeo ansehen"},
  en: {title: "Cell Clinics on video", play: "Load and play video", note: "A connection to Vimeo is only established when you click. Data such as your IP address will then be transferred to Vimeo.", external: "Watch on Vimeo"},
  es: {title: "Cell Clinics en vídeo", play: "Cargar y reproducir vídeo", note: "La conexión con Vimeo solo se establece al hacer clic. Se transmitirán a Vimeo datos como su dirección IP.", external: "Ver en Vimeo"}
};

export function HomeVimeo({locale, patient = false}: {locale: string; patient?: boolean}) {
  const [loaded, setLoaded] = useState(false);
  const c = copy[locale as keyof typeof copy] ?? copy.en;
  const videoId = patient ? "1234007045" : "1233281961";
  const hash = patient ? "3ec9409926" : "7a2868744a";
  const title = patient ? (locale === "de" ? "Cell Clinics für Patienten im Video" : locale === "es" ? "Cell Clinics para pacientes en vídeo" : "Cell Clinics for patients on video") : c.title;
  const sectionId = patient ? "patient-video" : "home-video";
  return <section className="section home-vimeo" aria-labelledby={`${sectionId}-title`}>
    <div className="container">
      <h2 className="section-title" id={`${sectionId}-title`}>{title}</h2>
      <div className="home-vimeo-frame">
        {loaded ? <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=${hash}&dnt=1&autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        /> : <div className="home-vimeo-consent">
          <Image src={patient ? "/images/cell-clinics-patient-video-poster.jpg" : "/images/cell-clinics-video-poster.jpg"} alt="" fill sizes="(max-width: 800px) 100vw, 800px" className="home-vimeo-poster" />
          <button type="button" className="button button-primary" aria-describedby={`${sectionId}-privacy`} onClick={() => setLoaded(true)}>
            <Play size={20} aria-hidden="true" />{c.play}
          </button>
        </div>}
      </div>
      <p className="home-vimeo-note" id={`${sectionId}-privacy`}>{c.note}</p>
      <a className="clinic-back-link" href={`https://vimeo.com/${videoId}/${hash}`} target="_blank" rel="noopener noreferrer">{c.external}</a>
    </div>
  </section>;
}
