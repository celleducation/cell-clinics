"use client";

import {useState} from "react";
import Image from "next/image";
import {Play} from "lucide-react";

type ClinicVideoProps = {
  title: string;
  privacyNote: string;
  playLabel: string;
};

export function ClinicVideo({title, privacyNote, playLabel}: ClinicVideoProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="clinic-video">
      <div className="clinic-video-player">
          {loaded ? <iframe src="https://player.vimeo.com/video/1239421248?h=2c2a5935e4&dnt=1&autoplay=1&title=0&byline=0&portrait=0&badge=0" title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" className="clinic-video-load" onClick={() => setLoaded(true)} aria-label={`${playLabel}: ${title}`} aria-describedby="clinic-video-privacy">
            <Image src="/images/editorial/longevity-lab-video-poster.webp" alt="" aria-hidden="true" fill sizes="(max-width: 767px) 100vw, 720px" className="clinic-video-poster" />
            <span className="clinic-video-play">
              <Play size={18} fill="currentColor" aria-hidden="true" />
              <span>{playLabel}</span>
            </span>
          </button>}
      </div>
      <div className="clinic-video-caption">
        <p id="clinic-video-privacy">{privacyNote}</p>
      </div>
    </div>
  );
}
