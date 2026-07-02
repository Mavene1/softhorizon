"use server";

import { Resend } from "resend";
import { JobApplicationSchema, type JobApplicationFormValues } from "./schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitJobApplication(values: JobApplicationFormValues, jobTitle: string): Promise<ActionResult> {
  // Honeypot: real applicants never see or fill this field.
  if (values.website) {
    return { success: true };
  }

  const parsed = JobApplicationSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors and try again." };
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      replyTo: parsed.data.email,
      subject: `New application: ${jobTitle}`,
      html: `
        <p><strong>Role:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Resume:</strong> <a href="${parsed.data.resumeUrl}">${parsed.data.resumeUrl}</a></p>
        ${parsed.data.portfolioUrl ? `<p><strong>Portfolio/LinkedIn:</strong> ${parsed.data.portfolioUrl}</p>` : ""}
        <p><strong>Message:</strong><br>${parsed.data.message}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send your application. Please try again or email us directly." };
  }
}
