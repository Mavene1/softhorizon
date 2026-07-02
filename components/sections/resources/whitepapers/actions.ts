"use server";

import { Resend } from "resend";
import { siteConfig } from "@/content/site";
import { WhitepaperRequestSchema, type WhitepaperRequestFormValues } from "./schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function requestWhitepaper(
  values: WhitepaperRequestFormValues,
  whitepaperTitle: string,
  whitepaperFileUrl: string
): Promise<ActionResult> {
  // Honeypot: real visitors never see or fill this field.
  if (values.website) {
    return { success: true };
  }

  const parsed = WhitepaperRequestSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please enter a valid email address" };
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: parsed.data.email,
      subject: `Your download: ${whitepaperTitle}`,
      html: `<p>Thanks for your interest! <a href="${siteConfig.url}${whitepaperFileUrl}">Click here to download "${whitepaperTitle}"</a>.</p>`,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send. Please try again." };
  }
}
