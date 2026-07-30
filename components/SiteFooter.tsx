import Image from "next/image";
import {getTranslations} from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/cell-clinics-logo.svg" alt="Cell Clinics" width={875} height={153} />
            </div>
            <p>{t("footer.description")}</p>
            <p>{t("footer.groupLine")}</p>
          </div>
          <nav className="footer-nav" aria-label="Platform">
            <strong>{t("nav.platform")}</strong>
            <a href="#platform">{t("nav.platform")}</a>
            <a href="#systems">{t("nav.clinicalSystems")}</a>
            <a href="#proof">{t("home.proofLabel")}</a>
            <a href="#application">{t("cta.partnerWithUs")}</a>
          </nav>
          <nav className="footer-nav" aria-label="Contact">
            <strong>{t("nav.contact")}</strong>
            <a href="mailto:info@cell-education.com">info@cell-education.com</a>
            <a href="#application">{t("cta.requestInfo")}</a>
            <a href="https://cell-education.com" target="_blank" rel="noreferrer">Cell Education ↗</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <a href="mailto:info@cell-education.com">info@cell-education.com</a>
          <span>
            <a href="https://cell-education.com/datenschutz">{t("footer.privacy")}</a>
            {" · "}
            <a href="https://cell-education.com/impressum">{t("footer.terms")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
