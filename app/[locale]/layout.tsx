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
import Script from "next/script";
import {ConsentScripts} from "@/components/ConsentScripts";

const dmSans = DM_Sans({subsets: ["latin"], variable: "--font-dm-sans", display: "swap"});

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
        {process.env.NEXT_PUBLIC_COOKIEYES_ID && <Script id="cookieyes" strategy="beforeInteractive" src={`https://cdn-cookieyes.com/client_data/${encodeURIComponent(process.env.NEXT_PUBLIC_COOKIEYES_ID)}/script.js`} />}
        <Script id="google-tag-manager" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TFZJGN3F');`}</Script>
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TFZJGN3F" height="0" width="0" style={{display: "none", visibility: "hidden"}} title="Google Tag Manager" /></noscript>
        <ConsentScripts />
        <NextIntlClientProvider messages={messages}>
          <WebinarBanner />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
