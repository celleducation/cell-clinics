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

- `RESEND_API_KEY`: optional server-side Resend API key.
- `PARTNER_INQUIRY_FROM`: verified sender address.
- `PARTNER_INQUIRY_TO`: application recipient; defaults to `info@cell-education.com`.
- `FORM_GUARD_SECRET`: random signing secret (at least 32 characters), identical
  on all instances. Falls back to the existing server-side `RESEND_API_KEY`.
- `FORM_TRUSTED_IP_HEADER`: self-hosted deployments only; name of an IP header
  overwritten by your trusted ingress. Never enable on an unprotected direct
  Node server. Vercel uses its own `x-forwarded-for` automatically.
- `NEXT_PUBLIC_SITE_URL`: canonical production origin.

Production form endpoints fail closed if the signing secret or trusted client
IP is missing. No submission contents or raw IPs are logged. Both routes retain
the existing FormSubmit delivery to `info@cell-education.com` when Resend is not
configured, but only AFTER server-side validation and spam checks. The partner
fallback was restored with explicit owner approval. There is no browser-side
delivery fallback that bypasses these checks. Errors preserve the form values
and offer the existing manual email contact.

Resend setup: the existing `cell-education.com` domain was verified in the
owner's dashboard on 2026-09-18. The default sender for both forms is
`Cell Clinics <forms@cell-education.com>`. Set a domain-restricted sending key
directly as the Production secret `RESEND_API_KEY` in Vercel, then deploy.
With a Resend key present, neither route falls back to FormSubmit on errors;
both require a returned email ID before reporting provider acceptance.

Server-side FormSubmit delivery explicitly supplies the fixed public website
URL (`_url`, Origin and Referer). Never forward incoming request headers or
query strings to the provider. Both routes require an explicit positive
acknowledgement; activation requests are not reported as successful delivery.
Failure logs contain only fixed diagnostic codes and HTTP status, never contact
data or raw provider responses. Acceptance by the provider is not proof of inbox delivery.

Both forms use a hidden honeypot, an IP- and form-bound signed timestamp
(minimum 3 seconds, expiry 24 hours), and 5 POST attempts per IP per hour.
Challenge issuance is limited to 30 per IP per hour. The bounded rate store
retains HMAC IP digests and counters for at most one hour, not raw IPs or form
data. **This quota is per Node process, not global across Vercel instances and
cold starts.** A shared first-party store or host-side limit is a deployment
prerequisite for a global guarantee; neither is provisioned by this PR.
See https://vercel.com/docs/headers/request-headers#x-forwarded-for for the
ingress-header trust assumption. Intentional text entered in contact fields
cannot be semantically guaranteed to be non-medical; there is no notes/message
field and unknown medical fields are rejected by the strict schemas.

Offline form tests (no email): `node scripts/test-form-guard.mjs` and
`node scripts/test-patient-inquiry.mjs`, plus `node scripts/test-form-repair.mjs`
(rendering and mocked provider responses). Local production API tests:
`node scripts/test-form-api.mjs http://localhost:3012` (rejections only).
After deployment: `node scripts/audit-seo.mjs https://cell-clinics.com` uses
real public URLs including HTTPS www, with curl and no browser execution.

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
