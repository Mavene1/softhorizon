import { z } from "zod";

export const PartnerApplicationSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  company: z.string().min(2, { error: "Company name is required" }),
  partnerType: z.enum(["referral", "technology", "agency", "other"], { error: "Please select a partner type" }),
  message: z.string().min(20, { error: "Please provide more detail (min 20 characters)" }),
  website: z.string().max(0, { error: "Invalid submission" }).optional(),
});

export type PartnerApplicationFormValues = z.infer<typeof PartnerApplicationSchema>;

export const partnerTypeOptions: { value: PartnerApplicationFormValues["partnerType"]; label: string }[] = [
  { value: "referral", label: "Referral partner" },
  { value: "technology", label: "Technology partner" },
  { value: "agency", label: "Agency / delivery partner" },
  { value: "other", label: "Other" },
];
