import {clinics} from "./clinics";

// Editorial modification date of this SEO revision, not the build timestamp.
// Update a record when its public content/metadata changes. New content types
// should append records from their own data source rather than manual URLs.
const seoRevision = "2026-09-18";
export const indexableRoutes = [
  {path: "", lastModified: seoRevision},
  {path: "/patients", lastModified: seoRevision},
  {path: "/network", lastModified: seoRevision},
  ...clinics.filter((clinic) => clinic.profileAvailable).map((clinic) => ({
    path: `/network/${clinic.slug}`, lastModified: seoRevision
  }))
];
