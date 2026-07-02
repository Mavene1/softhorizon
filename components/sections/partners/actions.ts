"use server";

import { Resend } from "resend";
import { PartnerApplicationSchema, type PartnerApplicationFormValues } from "./schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitPartnerApplication(values: PartnerApplicationFormValues): Promise<ActionResult> {
  // Honeypot: real applicants never see or fill this field.
  if (values.website) {
    return { success: true };
  }

  const parsed = PartnerApplicationSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors and try again." };
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      replyTo: parsed.data.email,
      subject: `New partner application: ${parsed.data.company}`,
      html: `
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Company:</strong> ${parsed.data.company}</p>
        <p><strong>Partner type:</strong> ${parsed.data.partnerType}</p>
        <p><strong>Message:</strong><br>${parsed.data.message}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send. Please try again or email us directly." };
  }
}
