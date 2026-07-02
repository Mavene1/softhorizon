import { z } from "zod";

export const WhitepaperRequestSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  website: z.string().max(0, { error: "Invalid submission" }).optional(),
});

export type WhitepaperRequestFormValues = z.infer<typeof WhitepaperRequestSchema>;
