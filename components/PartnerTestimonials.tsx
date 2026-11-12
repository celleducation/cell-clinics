import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ButtonLink} from "@/components/ui/ButtonLink";

const testimonials = [
  {
    key: "lars",
    slug: "lars-gienger-bretten",
    name: "Lars Gienger",
    photo: "/clinics/lars-gienger/lars-gienger.jpeg"
  }
] as const;

export async function PartnerTestimonials({profileSlug}: {profileSlug?: string}) {
  const t = await getTranslations("partnerTestimonials");
  const voices = testimonials.filter(voice => !profileSlug || voice.slug === profileSlug);
  if (!voices.length) return null;

  return (
    <section className="section section-soft" id="partner-testimonials">
      <div className="container">
        <SectionHeading title={t("sectionTitle")} />
        <div className="grid gap-8">
          {voices.map(voice => (
            <figure key={voice.slug} className="card grid items-center gap-6 p-6 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10 md:p-10">
              <Image src={voice.photo} alt={voice.name} width={360} height={480}
                sizes="(max-width: 320px) 75vw, 256px"
                className="aspect-[3/4] w-full max-w-64 justify-self-center rounded-2xl object-cover" />
              <div className="grid gap-4">
                <h3 className="text-2xl font-semibold">{t(`${voice.key}.heading`)}</h3>
                <blockquote className="lead">{t(`${voice.key}.quote`)}</blockquote>
                <div>
                  <strong>{voice.name}</strong>
                  <p>{t(`${voice.key}.practice`)}</p>
                </div>
                <small className="text-xs">{t("note")}</small>
                {!profileSlug && <div><ButtonLink href={`/network/${voice.slug}`} variant="secondary">{t("profileLink", {name: voice.name})}</ButtonLink></div>}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
