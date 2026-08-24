import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {clinicalSystems} from "@/content/site";
import {ButtonLink} from "./ui/ButtonLink";

export async function ClinicalSystems({compact = false}: {compact?: boolean}) {
  const t = await getTranslations();
  return (
    <div className="systems-list">
      {clinicalSystems.map((system, index) => (
        <article
          className={`system-row${compact ? " system-row-compact" : ""}${index % 2 ? " system-row-reverse" : ""}`}
          key={system.slug}
          tabIndex={compact ? 0 : undefined}
        >
          <div className="system-copy">
            <span className="system-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(`systems.card${index + 1}Title`)}</h3>
            <p>{t(`systems.card${index + 1}Body`)}</p>
            {!compact && (
              <ButtonLink href={`/clinical-systems/${system.slug}`} variant="text">
                Explore system
              </ButtonLink>
            )}
          </div>
          <div className="system-image">
            <Image src={system.image} alt="" width={1200} height={900} />
          </div>
        </article>
      ))}
    </div>
  );
}
