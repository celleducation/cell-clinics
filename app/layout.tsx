import type {Metadata} from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cell-clinics.com"),
  title: {
    default: "Cell Clinics | Modern Cellular Medicine",
    template: "%s | Cell Clinics"
  },
  description:
    "A physician-guided implementation platform for clinics building cellular medicine programs.",
  icons: {
    icon: "/images/faviconclinics.png"
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
