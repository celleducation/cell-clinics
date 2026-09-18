import Image from "next/image";
import {Play, ArrowUpRight} from "lucide-react";

type ClinicVideoProps = {
  title: string;
  privacyNote: string;
  externalLabel: string;
};

export function ClinicVideo({title, privacyNote, externalLabel}: ClinicVideoProps) {
  return (
    <div className="clinic-video">
      <div className="clinic-video-player">
          <a className="clinic-video-load" href="https://www.youtube.com/watch?v=g4iJK9b6_y0&t=2s" target="_blank" rel="noopener noreferrer" aria-label={`${externalLabel}: ${title}`}>
            <Image src="/images/editorial/longevity-lab-video-poster.webp" alt="" aria-hidden="true" fill sizes="(max-width: 767px) 100vw, 720px" className="clinic-video-poster" />
            <span className="clinic-video-play">
              <Play size={18} fill="currentColor" aria-hidden="true" />
              <span>{externalLabel}</span>
            </span>
          </a>
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
