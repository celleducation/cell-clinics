import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {SiteFooter} from "@/components/SiteFooter";
import {SiteHeader} from "@/components/SiteHeader";
import {WebinarBanner} from "@/components/WebinarBanner";
import type {Metadata} from "next";
import {DM_Sans} from "next/font/google";
import {SITE_URL} from "@/lib/seo";
import "../globals.css";
import {ConsentScripts} from "@/components/ConsentScripts";
import {MethodNotice} from "@/components/MethodNotice";

const dmSans = DM_Sans({subsets: ["latin"], variable: "--font-dm-sans", display: "swap"});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5F9V4W2K";
const cookieYesId = process.env.NEXT_PUBLIC_COOKIEYES_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {icon: "/images/faviconclinics.png"},
  robots: {
    index: true, follow: true, "max-image-preview": "large",
    googleBot: {index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1}
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={dmSans.variable}>
      <head>
        {(gtmId || process.env.NEXT_PUBLIC_GA_ID) && <script id="google-consent-default" dangerouslySetInnerHTML={{__html: `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'denied'});`}} />}
        {cookieYesId && <script id="cookieyes" src={`https://cdn-cookieyes.com/client_data/${encodeURIComponent(cookieYesId)}/script.js`} />}
        {gtmId && <>
          <script id="google-tag-start" dangerouslySetInnerHTML={{__html: "window.gtag('js', new Date());window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});"}} />
          {/* Keep React from hoisting the async loader ahead of the consent defaults. */}
          <script id="google-tag-manager" itemProp="" async src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`} />
        </>}
      </head>
      <body>
        {gtmId && <noscript><iframe title="Google Tag Manager" src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`} width="0" height="0" style={{display: "none", visibility: "hidden"}} /></noscript>}
        <ConsentScripts />
        <NextIntlClientProvider messages={messages}>
          <WebinarBanner />
          <SiteHeader />
          <main>{children}</main>
          <MethodNotice locale={locale} />
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
