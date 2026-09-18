import {getTranslations} from "next-intl/server";
import {localizedPath} from "@/i18n/paths";
import type {Locale} from "@/i18n/routing";
import {breadcrumbSchema, jsonLd} from "@/lib/seo";

export async function Breadcrumbs({locale, items}: {locale: string; items: {name: string; path: string}[]}) {
  const t = await getTranslations({locale, namespace: "seo"});
  return (
    <>
      <nav className="breadcrumbs container" aria-label={t("breadcrumbs")}>
        <ol>
          {items.map((item, index) => (
            <li key={item.path}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1
                ? <span aria-current="page">{item.name}</span>
                : <a href={localizedPath(locale as Locale, item.path)}>{item.name}</a>}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd(breadcrumbSchema(locale, items))}} />
    </>
  );
}
