import {z} from "zod";

// Contact details only. Never accept symptom, complaint or free-text fields.
export const patientInquirySchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().email().max(200),
  location: z.string().trim().min(2).max(160),
  consent: z.literal("on"),
  companyFax: z.literal(""),
  formToken: z.string().min(1).max(200)
}).strict();
