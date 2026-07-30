import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/access", destination: "/en#application", permanent: true },
      { source: "/experts", destination: "/en#leadership", permanent: true },
      { source: "/science", destination: "/en#systems", permanent: true },
      { source: "/protocols/:path*", destination: "/en#systems", permanent: true },
      { source: "/dashboard", destination: "/en#platform", permanent: true },
      { source: "/:locale/platform", destination: "/:locale#platform", permanent: true },
      { source: "/:locale/clinical-systems/:path*", destination: "/:locale#systems", permanent: true },
      { source: "/:locale/network/:path*", destination: "/:locale#proof", permanent: true },
      { source: "/:locale/partnerships/:path*", destination: "/:locale#application", permanent: true },
      { source: "/:locale/company/:path*", destination: "/:locale#leadership", permanent: true },
      { source: "/:locale/contact", destination: "/:locale#application", permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);
