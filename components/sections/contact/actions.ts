"use server";

import { Resend } from "resend";
import { ContactSchema, type ContactFormValues } from "./schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(values: ContactFormValues): Promise<ActionResult> {
  // Honeypot: real users never see or fill this field.
  if (values.website) {
    return { success: true };
  }

  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors and try again." };
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      replyTo: parsed.data.email,
      subject: `New inquiry: ${parsed.data.subject}`,
      html: `
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        ${parsed.data.company ? `<p><strong>Company:</strong> ${parsed.data.company}</p>` : ""}
        ${parsed.data.budget ? `<p><strong>Budget:</strong> ${parsed.data.budget}</p>` : ""}
        <p><strong>Message:</strong><br>${parsed.data.message}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again or email us directly." };
  }
}
