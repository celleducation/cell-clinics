# Cell Clinics

Multi-page Cell Clinics website built with Next.js App Router, TypeScript, Tailwind CSS and `next-intl`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. English is the default locale and redirects to `/en`.

Production check:

```bash
npm run lint
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`.

- `RESEND_API_KEY`: server-side Resend API key.
- `PARTNER_INQUIRY_FROM`: verified sender address.
- `PARTNER_INQUIRY_TO`: application recipient; defaults to `info@cell-education.com`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key.
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile server secret.
- `NEXT_PUBLIC_SITE_URL`: canonical production origin.

In development, form submissions are logged when Resend is unset. Production returns a clear service error until email delivery is configured.

## Add a clinic

1. Add optimized assets under `public/clinics/<slug>/`.
2. Add a typed entry to `content/clinics.ts`.
3. Use a unique lowercase slug.
4. Add approved localized clinic copy to `messages/en.json`, `messages/de.json` and `messages/es.json`.

The directory, SVG map marker, filters, sitemap and dynamic clinic route are generated from the clinic content model.

## Brand assets

- Main logo: `public/cell-clinics-logo.svg`
- Favicon: `public/images/faviconcellclinic.svg`
- Cell Group diagram: `public/brand/cell-group-ecosystem.svg`
- Shared site media: `public/images/`

Replace files in place and preserve their names to update the site without component changes.

## Map provider

`components/ClinicFinder.tsx` currently implements the approved v1 SVG map. The directory data and filter state are separate from the visual map. To introduce Mapbox or Google Maps, replace only the map panel with a provider adapter that consumes the same `Clinic[]` collection and selected-filter state.

## Localization

Locale catalogs live in `messages/en.json`, `messages/de.json` and `messages/es.json`. English is the source version. Do not place untranslated English text in DE or ES catalogs; render an explicit English fallback and record a `TODO: translate <key> [locale]`.

## Deployment

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Root Directory: repository root
- Build Command: `npm run build`
- Output Directory: leave empty

Add all environment variables before the production deployment. The generated `sitemap.xml`, `robots.txt`, locale routes and server-side form handler require a Next.js deployment rather than static HTML hosting.

## Content audit

- `CONTENT_INVENTORY.md`: complete source inventory.
- `CONTENT_MIGRATION.md`: old-to-new route mapping and consolidation log.
