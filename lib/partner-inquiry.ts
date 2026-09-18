import {z} from "zod";

// No notes/free-text message channel. Strict parsing rejects even manually
// submitted notes/health fields. Contact fields cannot prevent all misuse.
export const partnerInquirySchema = z.object({
  clinicName: z.string().trim().min(2).max(160),
  website: z.string().max(240).optional(),
  country: z.string().trim().min(2).max(100),
  clinicType: z.string().trim().min(2).max(120),
  profession: z.string().trim().min(2).max(120),
  primaryContact: z.string().trim().min(2).max(160),
  email: z.string().email().max(200),
  phone: z.string().max(80).optional(),
  consent: z.literal("on"),
  companyFax: z.literal(""),
  formToken: z.string().min(1).max(200)
}).strict();
