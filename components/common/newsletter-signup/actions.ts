"use server";

import { NewsletterSchema, type NewsletterValues } from "./schemas";

export async function subscribeToNewsletter(values: NewsletterValues) {
  // Honeypot: real users never fill this hidden field.
  if (values.company) {
    return { success: true };
  }

  const parsed = NewsletterSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Enter a valid email address" };
  }

  const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: parsed.data.email, status: "subscribed" }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.title === "Member Exists") return { success: true };
      return { success: false, error: "Could not subscribe. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not subscribe. Please try again." };
  }
}
