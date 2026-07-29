import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/access", destination: "/en/partnerships/apply", permanent: true },
      { source: "/experts", destination: "/en/company/leadership", permanent: true },
      { source: "/science", destination: "/en/clinical-systems", permanent: true },
      { source: "/protocols", destination: "/en/clinical-systems/protocols", permanent: true },
      { source: "/dashboard", destination: "/en/platform", permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);
