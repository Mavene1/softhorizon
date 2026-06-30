# Forms

## Overview

This site has several user-facing forms across the experience:

| Form | Route / Section | Action |
|---|---|---|
| Contact / inquiry | `/contact` | Server Action → Resend email |
| Newsletter signup | Homepage, blog sidebar | Server Action → Mailchimp/Buttondown |
| Job application | `/careers/[slug]` | Server Action → Resend email to HR |
| Whitepaper gate | `/resources/whitepapers` | Server Action → Resend delivers PDF link |
| Partner application | `/partners` | Server Action → Resend email |

All use the same stack:

- **Zod v4** — schema and validation
- **React Hook Form v7** — form state
- **@hookform/resolvers v5** — connects Zod to RHF
- **Next.js Server Actions** — form submission
- **TanStack Query `useMutation`** — submission state + retry
- **sonner** — success/error toasts

## File Structure

```
components/sections/contact/
  contact-form-section.tsx     → "use client" wrapper (uses useContactForm hook)
  hooks/
    use-contact-form.ts        → all form + mutation logic
  schemas.ts                   → Zod schema + inferred type
  actions.ts                   → "use server" Server Action
```

For other forms (newsletter, job application), follow the same structure under the relevant section folder.

## Contact Form Schema (`schemas.ts`)

Use Zod v4 top-level format validators — NOT chained `.email()`, `.url()`:

```ts
// components/sections/contact/schemas.ts
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  company: z.string().optional(),
  subject: z.string().min(5, { error: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { error: "Please provide more detail (min 20 characters)" }),
  budget: z.enum(["<5k", "5k-20k", "20k-50k", "50k+", "not-sure"]).optional(),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;
```

**Zod v4 format validators:**

```ts
// ✅ correct (Zod v4)
z.email({ error: "Invalid email" })
z.url({ error: "Invalid URL" })
z.uuid({ error: "Invalid ID" })

// ❌ wrong (Zod v3 — deprecated in v4)
z.string().email("Invalid email")
z.string().url()
```

**Error param:** unified `error` key replaces `message`, `invalid_type_error`, and `required_error`:

```ts
// ✅ v4
z.string({ error: "This field is required" }).min(1, { error: "Cannot be empty" })

// ❌ v3
z.string({ required_error: "Required", invalid_type_error: "Must be a string" })
```

## Contact Form Hook (`use-contact-form.ts`)

All form logic lives in the hook, not in the component:

```ts
// components/sections/contact/hooks/use-contact-form.ts
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactSchema, type ContactFormValues } from "../schemas";
import { submitContactForm } from "../actions";

export function useContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      budget: undefined,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success("Message sent! We'll be in touch within 24 hours.");
      form.reset();
    },
    onError: () => toast.error("Connection error. Please try again."),
  });

  return {
    form,
    handleSubmit: form.handleSubmit((values) => mutate(values)),
    isPending,
    isSuccess,
  };
}
```

## Contact Form Section (`contact-form-section.tsx`)

The component is thin — all logic comes from the hook. Field components come from shadcn/ui:

```tsx
// components/sections/contact/contact-form-section.tsx
"use client";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContactForm } from "./hooks/use-contact-form";

export function ContactFormSection() {
  const { form, handleSubmit, isPending } = useContactForm();

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
        <p className="text-muted-foreground mb-10">
          Tell us about your project and we'll get back to you within 24 hours.
        </p>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What are you working on?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project, timeline, and goals..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
```

## Server Action (`actions.ts`)

```ts
// components/sections/contact/actions.ts
"use server";
import { ContactSchema, type ContactFormValues } from "./schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(values: ContactFormValues): Promise<ActionResult> {
  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  try {
    // await resend.emails.send({ ... });  — see docs/integrations.md for full Resend setup
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message" };
  }
}
```

## Newsletter Signup (Minimal)

```ts
// components/common/newsletter-signup/schemas.ts
import { z } from "zod";
export const NewsletterSchema = z.object({ email: z.email() });
export type NewsletterValues = z.infer<typeof NewsletterSchema>;
```

## Rules

- All `useState`/`useForm`/`useMutation` goes in the hook, not the component
- Component is a thin wrapper: `<Form>` + fields + submit `<Button>`
- Schema and inferred type live in `schemas.ts` in the same folder
- Server Actions go in `actions.ts` in the same folder
- Always type the Server Action return as `{ success: boolean; error?: string }`
- Use `useMutation` for submission, not raw `fetch` with `useState`
- `sonner` is the toast library — `toast.success()` / `toast.error()` only
- `isPending` not `isLoading` (TanStack Query v5)
- `z.email()` not `z.string().email()` (Zod v4)
- `error:` not `message:` for Zod error messages (Zod v4)

## Do NOT

- Put `useForm` directly in a component body — extract to a hook
- Validate in the Server Action using custom logic — use `schema.safeParse()`
- Use `z.string().email()` — use `z.email()` (Zod v4)
- Use `message:` in Zod schemas — use `error:` (Zod v4)
- Use `required_error` or `invalid_type_error` — use unified `error:` (Zod v4)
- Use `isLoading` — use `isPending` (TanStack Query v5)
