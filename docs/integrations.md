# Third-Party Integrations

## Philosophy

This site has no custom backend API server. Every user action (email, newsletter, live chat, analytics) is handled by a third-party service. The integration pattern is always the same:

```
User action (browser)
  → Client Component calls Server Action
  → Server Action calls third-party SDK (server-side, key is safe)
  → Third-party service does the work
```

**Never call third-party SDKs from Client Components** — API keys would be exposed in the browser bundle.

---

## Installed Versions

All packages are installed. Versions as of project setup:

| Package | Version |
|---|---|
| `resend` | ^6.16.0 |
| `fuse.js` | ^7.4.2 |
| `posthog-js` | ^1.396.2 |
| `@vercel/analytics` | ^2.0.1 |
| `@vercel/speed-insights` | ^2.0.0 |

Mailchimp and Crisp have no npm packages — they use raw fetch and a script embed respectively.

---

## Resend — Transactional Email

**Used for:** contact form submissions, job application receipts, whitepaper delivery links, partner application confirmations.

### Env vars (`.env.local`)
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
EMAIL_FROM=hello@softhorizon.com
EMAIL_TO=hello@softhorizon.com
```

### Server Action pattern

```ts
// components/sections/contact/actions.ts
"use server";
import { Resend } from "resend";
import { ContactSchema, type ContactFormValues } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(values: ContactFormValues) {
  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Invalid form data" };

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `New inquiry: ${parsed.data.subject}`,
      html: `
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Message:</strong><br>${parsed.data.message}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message" };
  }
}
```

### Whitepaper delivery pattern

```ts
// components/sections/resources/whitepapers/actions.ts
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function requestWhitepaper(email: string, title: string, downloadUrl: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: `Your download: ${title}`,
    html: `<p>Thank you! <a href="${downloadUrl}">Click here to download ${title}</a>.</p>`,
  });
  return { success: true };
}
```

---

## Mailchimp — Newsletter List Management

**Used for:** newsletter signups (homepage, blog sidebar).

Mailchimp's API doesn't need a heavy SDK — use their REST API directly in a Server Action.

### Env vars (`.env.local`)
```
MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=xxxxxxxxxx
```

### Server Action pattern

```ts
// components/common/newsletter-signup/actions.ts
"use server";

export async function subscribeToNewsletter(email: string) {
  const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });

  if (!res.ok) {
    const data = await res.json();
    // 400 with "Member Exists" is not a real error — treat as success
    if (data.title === "Member Exists") return { success: true };
    return { success: false, error: "Could not subscribe. Please try again." };
  }

  return { success: true };
}
```

**Alternative:** [Buttondown](https://buttondown.email) has a simpler API and is a great choice for smaller lists. Swap the fetch target; the Server Action shape stays the same.

---

## Crisp — Live Chat Widget

**Used for:** live chat support widget (floating button, bottom-right corner).

Crisp is a client-side embed — no Server Action needed. It loads a third-party script and uses a global `$crisp` array.

### Setup

No npm package needed. Add the embed as a `"use client"` component:

```tsx
// components/layout/crisp-chat.tsx
"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

export function CrispChat() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!;
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
```

### Env vars (`.env.local`)
```
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Mount in root layout

```tsx
// app/layout.tsx
import { CrispChat } from "@/components/layout/crisp-chat";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CrispChat />
      </body>
    </html>
  );
}
```

---

## Vercel Analytics — Page Views & Core Web Vitals

**Used for:** privacy-first page view tracking and Core Web Vitals monitoring. No consent banner needed in most regions.

### Mount in root layout

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

No env vars needed — Vercel auto-detects the project on deploy.

---

## PostHog — Product Analytics (Alternative / Supplement)

**Used for:** event tracking, funnel analysis, session recording. Open-source; can be self-hosted. Use alongside or instead of Vercel Analytics.

### Env vars (`.env.local`)
```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Provider component

```tsx
// providers/posthog.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      capture_pageview: false, // Next.js App Router manages routing — avoids double-counting
      capture_pageleave: true,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

`PHProvider` is already composed in `providers/index.tsx` alongside `QueryClientProvider`. See `providers/index.tsx` for the full composer.

---

## Fuse.js — Global Cmd+K Search

**Used for:** client-side fuzzy search over all static content (services, projects, blog posts, team members, pages).

### Search index (`lib/search.ts`)

```ts
// lib/search.ts
import Fuse from "fuse.js";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { teamMembers } from "@/content/team";

export interface SearchResult {
  type: "service" | "project" | "team" | "page";
  title: string;
  description: string;
  href: string;
}

const searchData: SearchResult[] = [
  ...services.map((s) => ({
    type: "service" as const,
    title: s.title,
    description: s.tagline,
    href: `/services/${s.slug}`,
  })),
  ...projects.map((p) => ({
    type: "project" as const,
    title: p.title,
    description: p.summary,
    href: `/projects/${p.slug}`,
  })),
  ...teamMembers.map((m) => ({
    type: "team" as const,
    title: m.name,
    description: m.role,
    href: `/team/${m.slug}`,
  })),
];

export const fuse = new Fuse(searchData, {
  keys: ["title", "description"],
  threshold: 0.3,
  includeScore: true,
});
```

The `SearchDialog` component (`components/layout/search-dialog.tsx`) is a Client Component that imports `fuse` from `lib/search.ts` and renders results in a shadcn `<Dialog>`.

---

## Integration Decision Guide

| Need | Solution | Needs Server Action? |
|---|---|---|
| Send an email | Resend | Yes |
| Newsletter subscribe | Mailchimp / Buttondown | Yes |
| Live chat widget | Crisp | No (client embed) |
| Page view analytics | Vercel Analytics | No (layout component) |
| Event / funnel analytics | PostHog | No (provider component) |
| Client-side search | Fuse.js | No (client component) |

## Do NOT

- Call `resend.emails.send()` from a Client Component — the API key would be in the browser bundle
- Call the Mailchimp API from a Client Component — same reason
- Import `posthog-js` in a Server Component — it is browser-only
- Add the Crisp script to `<head>` directly in layout — use the `CrispChat` component
- Skip rate limiting on Server Actions that call Resend/Mailchimp — add basic throttle or honeypot to forms
- Use `@mailchimp/mailchimp_marketing` npm package — the raw fetch to their REST API is simpler and has no Node.js compatibility issues with Next.js edge runtime
