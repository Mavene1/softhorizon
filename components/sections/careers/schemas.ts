import { z } from "zod";

export const JobApplicationSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  portfolioUrl: z.string().optional(),
  resumeUrl: z.url({ error: "Please provide a valid link to your resume" }),
  message: z.string().min(20, { error: "Tell us a bit more about yourself (min 20 characters)" }),
  website: z.string().max(0, { error: "Invalid submission" }).optional(),
});

export type JobApplicationFormValues = z.infer<typeof JobApplicationSchema>;
