import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

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
            <Link href="/platform">{t("nav.platform")}</Link>
            <Link href="/clinical-systems">{t("nav.clinicalSystems")}</Link>
            <Link href="/network">{t("nav.network")}</Link>
            <Link href="/partnerships">{t("nav.partnerships")}</Link>
          </nav>
          <nav className="footer-nav" aria-label="Company">
            <strong>{t("nav.company")}</strong>
            <Link href="/company">{t("nav.company")}</Link>
            <Link href="/company/leadership">{t("leadership.title")}</Link>
            <Link href="/company/news">{t("news.label")}</Link>
            <Link href="/contact">{t("nav.contact")}</Link>
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
