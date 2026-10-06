"use client";

import {useState} from "react";
import {Play} from "lucide-react";

const copy = {
  de: {title: "Cell Clinics im Video", play: "Video laden und abspielen", note: "Erst mit Ihrem Klick wird eine Verbindung zu Vimeo hergestellt. Dabei werden Daten wie Ihre IP-Adresse an Vimeo übertragen.", external: "Direkt auf Vimeo ansehen"},
  en: {title: "Cell Clinics on video", play: "Load and play video", note: "A connection to Vimeo is only established when you click. Data such as your IP address will then be transferred to Vimeo.", external: "Watch on Vimeo"},
  es: {title: "Cell Clinics en vídeo", play: "Cargar y reproducir vídeo", note: "La conexión con Vimeo solo se establece al hacer clic. Se transmitirán a Vimeo datos como su dirección IP.", external: "Ver en Vimeo"}
};

export function HomeVimeo({locale}: {locale: string}) {
  const [loaded, setLoaded] = useState(false);
  const c = copy[locale as keyof typeof copy] ?? copy.en;
  return <section className="section home-vimeo" aria-labelledby="home-video-title">
    <div className="container">
      <h2 className="section-title" id="home-video-title">{c.title}</h2>
      <div className="home-vimeo-frame">
        {loaded ? <iframe
          src="https://player.vimeo.com/video/1233281961?h=7a2868744a&dnt=1&autoplay=1"
          title={c.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        /> : <div className="home-vimeo-consent">
          <button type="button" className="button button-primary" aria-describedby="home-video-privacy" onClick={() => setLoaded(true)}>
            <Play size={20} aria-hidden="true" />{c.play}
          </button>
        </div>}
      </div>
      <p className="home-vimeo-note" id="home-video-privacy">{c.note}</p>
      <a className="clinic-back-link" href="https://vimeo.com/1233281961/7a2868744a" target="_blank" rel="noopener noreferrer">{c.external}</a>
    </div>
  </section>;
}
