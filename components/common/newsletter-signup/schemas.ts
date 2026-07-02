import { z } from "zod";

export const NewsletterSchema = z.object({
  email: z.email({ error: "Enter a valid email address" }),
  company: z.string().optional(),
});

export type NewsletterValues = z.infer<typeof NewsletterSchema>;
