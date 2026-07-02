import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  company: z.string().optional(),
  subject: z.string().min(5, { error: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { error: "Please provide more detail (min 20 characters)" }),
  budget: z.enum(["<5k", "5k-20k", "20k-50k", "50k+", "not-sure"]).optional(),
  website: z.string().max(0, { error: "Invalid submission" }).optional(),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;

export const budgetOptions: { value: NonNullable<ContactFormValues["budget"]>; label: string }[] = [
  { value: "<5k", label: "Under $5,000" },
  { value: "5k-20k", label: "$5,000 – $20,000" },
  { value: "20k-50k", label: "$20,000 – $50,000" },
  { value: "50k+", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
];
