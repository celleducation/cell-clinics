"use client";
import {useState} from "react";
import Image from "next/image";

export function NewsVideo({locale}: {locale: string}) {
  const [loaded, setLoaded] = useState(false);
  const c = locale === "de" ? {play: "Video laden und abspielen", note: "Erst nach Ihrem Klick wird Vimeo geladen. Dabei werden unter anderem Ihre IP-Adresse und Browserdaten an Vimeo übertragen."} : locale === "es" ? {play: "Cargar y reproducir vídeo", note: "Vimeo solo se carga al hacer clic. Se transmiten a Vimeo su dirección IP y datos del navegador."} : {play: "Load and play video", note: "Vimeo loads only after you click. Your IP address and browser information are then transferred to Vimeo."};
  return <div><div className="video-frame news-video-consent">
    {loaded ? <iframe src="https://player.vimeo.com/video/1239421248?h=2c2a5935e4&dnt=1&autoplay=1" title="Longevity Lab 2026" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <>
      <Image src="/images/editorial/longevity-lab-video-poster.webp" alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
      <button className="button button-primary" type="button" aria-describedby="news-video-privacy" onClick={() => setLoaded(true)}>{c.play}</button>
    </>}
  </div><p id="news-video-privacy" className="home-vimeo-note">{c.note}</p></div>;
}
