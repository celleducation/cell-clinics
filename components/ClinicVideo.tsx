"use client";

import {useEffect, useState} from "react";
import {Play, ArrowUpRight} from "lucide-react";

type ClinicVideoProps = {
  title: string;
  loadLabel: string;
  privacyNote: string;
  externalLabel: string;
  loadingLabel: string;
  fallbackLabel: string;
};

export function ClinicVideo({title, loadLabel, privacyNote, externalLabel, loadingLabel, fallbackLabel}: ClinicVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!loaded || ready) return;
    const timer = window.setTimeout(() => setDelayed(true), 10000);
    return () => window.clearTimeout(timer);
  }, [loaded, ready]);

  return (
    <div className="clinic-video">
      <div className="clinic-video-player">
        {loaded ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/g4iJK9b6_y0?start=2&rel=0"
            title={title}
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={(event) => {
              setReady(true);
              event.currentTarget.focus();
            }}
          />
        ) : (
          <button type="button" className="clinic-video-load" onClick={() => setLoaded(true)} aria-label={`${loadLabel}: ${title}`}>
            <span className="clinic-video-wordmark" aria-hidden="true">Longevity Lab <span>2026</span></span>
            <span className="clinic-video-play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
            <span>{loadLabel}</span>
          </button>
        )}
        {loaded && !ready && (
          <div className="clinic-video-status" role="status">{delayed ? fallbackLabel : loadingLabel}</div>
        )}
      </div>
      <div className="clinic-video-caption">
        <p>{privacyNote}</p>
        <a href="https://www.youtube.com/watch?v=g4iJK9b6_y0&t=2s" target="_blank" rel="noopener noreferrer">
          {externalLabel} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
