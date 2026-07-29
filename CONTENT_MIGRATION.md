# Content Migration Map — cell-clinics.com

Verified against production on 2026-07-29. Status: `moved`, `merged`, or
`needs-review`. “Merged” means duplicate presentation is consolidated while
the approved message and factual content remain present.

| # | Current section / item | New route | Status | Notes |
|---|---|---|---|---|
| 1 | Header logo and navigation | all routes | moved | Real route navigation replaces hashes. |
| 2 | EN / DE / ES language control | all locale routes | moved | Existing production translations migrate as source material. |
| 3 | Hero: "The Operating System For Modern Cellular Medicine" | `/[locale]` | moved | Title and subheading remain verbatim. |
| 4 | Hero trust indicators | `/[locale]` | moved | Four items remain together. |
| 5 | Hero ecosystem image and panel | `/[locale]`, `/[locale]/platform` | moved | Image reused with meaningful context. |
| 6 | Longevity Lab 2026 copy, Vimeo and link | `/[locale]/company/news` | moved | Home receives a compact event teaser. |
| 7 | "Central Model Clinic" / "One Of Our Central Partners" | `/[locale]/network/alpstein` | moved | Home receives a compact proof teaser. |
| 8 | Alpstein partner logo and Powered by Cell Clinics mark | `/[locale]/network/alpstein` | moved | |
| 9 | Alpstein four focus labels | `/[locale]/network/alpstein` | moved | Also powers directory filters. |
| 10 | "What This Demonstrates" and five points | `/[locale]/network/alpstein` | moved | Verbatim approved content. |
| 11 | "Powered By Clinical Frameworks" | `/[locale]/network/alpstein` | moved | Verbatim approved content. |
| 12 | Alpstein landscape, recovery and location media | `/[locale]/network/alpstein` | moved | Directory card uses one representative image. |
| 13 | Sheba Medical Center announcement, note, logo and image | `/[locale]/company/news` | moved | Home receives a compact news teaser. |
| 14 | Partner Ecosystem introduction | `/[locale]/partnerships` | moved | |
| 15 | Education module | `/[locale]/partnerships/ecosystem` | moved | |
| 16 | Clinical Systems module | `/[locale]/partnerships/ecosystem` | moved | |
| 17 | Diagnostics module | `/[locale]/partnerships/ecosystem` | moved | |
| 18 | Products module | `/[locale]/partnerships/ecosystem` | moved | |
| 19 | Global Network module | `/[locale]/partnerships/ecosystem` | moved | |
| 20 | Practice Growth module | `/[locale]/partnerships/ecosystem` | moved | |
| 21 | "More Than Products. More Than Education." | `/[locale]/platform` | merged | Consolidated with integrated-platform narrative. |
| 22 | "How The Platform Works" | `/[locale]/platform` | moved | Leads ecosystem diagram. |
| 23 | "One Integrated Ecosystem For Modern Cellular Medicine" | `/[locale]/platform` | merged | Same approved copy, one presentation. |
| 24 | Six platform modules | `/[locale]/platform` | moved | Cell Education, Clinical Systems, Diagnostics, Products, Global Hub, Partner Clinics. |
| 25 | "One Platform. One Standard. One Network." | `/[locale]/platform` | moved | Platform closing statement. |
| 26 | Clinical Systems heading and four pathways | `/[locale]/clinical-systems` | moved | |
| 27 | Mitochondrial Performance | `/[locale]/clinical-systems` | moved | |
| 28 | Genetic & Cellular Context | `/[locale]/clinical-systems/diagnostics` | moved | |
| 29 | Regeneration & Recovery | `/[locale]/clinical-systems/protocols` | moved | |
| 30 | Therapeutic Access | `/[locale]/clinical-systems/protocols` | moved | |
| 31 | Medical Leadership and four credential areas | `/[locale]/company/leadership` | moved | Dr. Kay Bredehorst only. |
| 32 | Dr. Kay Bredehorst portrait and role | `/[locale]/company/leadership` | moved | |
| 33 | Partner Application copy and fields | `/[locale]/partnerships/apply` | moved | Rebuilt as accessible two-step form. |
| 34 | Partner form sending/success/error states | application component | moved | Server-side delivery replaces FormSubmit. |
| 35 | Repeated "Become A Partner Clinic" CTAs | global CTA + apply route | merged | Duplicate buttons consolidated. |
| 36 | Repeated "Request Partnership Information" CTAs | contextual secondary links | merged | |
| 37 | Cell Education product relationship | `/[locale]/company`, footer | merged | Updated to approved Cell Group ecosystem wording. |
| 38 | Cell Group ecosystem diagram | `/[locale]/company` | moved | From handoff kit; never described as a holding. |
| 39 | Contact email | `/[locale]/contact`, footer | moved | `info@cell-education.com`. |
| 40 | Privacy and imprint links | footer | moved | Existing Cell Education legal destinations retained. |
| 41 | Legacy `/#platform` | `/[locale]/platform` | moved | Client-side hash redirect. |
| 42 | Legacy `/#clinical-systems`, `/#systems` | `/[locale]/clinical-systems` | moved | Client-side hash redirect. |
| 43 | Legacy `/#partnerships`, `/#partner` | `/[locale]/partnerships/apply` | moved | Client-side hash redirect. |
| 44 | Legacy `/#contact` | `/[locale]/contact` | moved | Client-side hash redirect. |
| 45 | Statistics | relevant route | needs-review | No approved live figures found; intentionally omitted. |
| 46 | Clinic doctors | `/[locale]/network/[clinic]` | needs-review | Data structure exists; no approved profiles added. |

