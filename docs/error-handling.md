# Error Handling

## Error Boundaries (`error.tsx`)

Next.js App Router catches rendering and async errors in `error.tsx` files.

Every `error.tsx` must:
- Be `"use client"` — Next.js requires this
- Accept `error: Error & { digest?: string }` and `reset: () => void` props
- Render an on-brand error UI with a way to retry or navigate home

```tsx
// app/error.tsx — root catch-all
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-6">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred. Try again, or return home.
      </p>
      {process.env.NODE_ENV === "development" && (
        <p className="font-mono text-sm text-destructive">{error.message}</p>
      )}
      <div className="flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          {/* hard navigate — clears corrupt router state */}
          <a href="/">Go home</a>
        </Button>
      </div>
    </div>
  );
}
```

`error.digest` is safe to surface (opaque Next.js-generated ID). **Never surface `error.message` in production** — it may contain internal details. The navigate-away button uses `<a href>` (hard navigation), not `<Link>` — this intentionally clears corrupt router state.

### Adding Error Boundaries

Add `error.tsx` next to `layout.tsx` in any route segment that does meaningful data work:

```
app/
  error.tsx               → root catch-all (always present)
  blog/
    error.tsx             → blog-specific error (if fetching from external CMS)
  careers/
    error.tsx             → careers-specific error
```

Most pages don't need their own `error.tsx` — the root one catches everything. Add a scoped one only when you need a different recovery message or navigation target per section.

## Not-Found Pages (`not-found.tsx`)

```tsx
// app/not-found.tsx — root 404
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-6">
      <span className="text-8xl font-bold text-muted-foreground/30">404</span>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
```

`not-found.tsx` is a Server Component by default — no `"use client"` needed.

### Triggering `notFound()` programmatically

In dynamic route pages, call `notFound()` when a slug doesn't match any content:

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;  // params is async in Next.js 16
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailSections project={project} />;
}
```

Apply this pattern to every dynamic route: `/projects/[slug]`, `/services/[slug]`, `/team/[member]`, `/careers/[slug]`, `/blog/[slug]`, `/solutions/[slug]`.

## Server Action Error Pattern

Always return `{ success, error }` — never throw to the React tree from a Server Action:

```ts
// components/sections/contact/actions.ts
"use server";

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
    // await resend.emails.send({ ... })
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send. Please try again." };
  }
}
```

Handle results in `useMutation`:

```ts
const { mutate, isPending } = useMutation({
  mutationFn: submitContactForm,
  onSuccess: (result) => {
    if (!result.success) {
      toast.error(result.error ?? "Something went wrong");
      return;
    }
    toast.success("Message sent!");
    form.reset();
  },
  onError: () => toast.error("Connection error. Please try again."),
});
```

## Toast Notifications (Sonner)

```ts
import { toast } from "sonner";

toast.success("Message sent!");
toast.error("Failed to send");
toast.loading("Sending...");
toast.promise(myAsyncFn(), {
  loading: "Sending...",
  success: "Done!",
  error: "Failed",
});
```

`<Toaster>` is mounted in the root layout.

## Rules

- Root `app/error.tsx` is always present
- Scoped `error.tsx` per section only when you need different recovery UX
- `error.tsx` must be `"use client"` — Next.js requires it
- `not-found.tsx` does not need `"use client"` (Server Component by default)
- Never surface `error.message` in production — only show it in `NODE_ENV === "development"`
- Use `<a href>` not `<Link>` in error page navigation — clears corrupt router state
- Call `notFound()` in all dynamic route pages when the slug doesn't match `content/` data
- Server Actions must return `{ success, error }` — never throw on expected failures
- `params` is a Promise in Next.js 16 — always `await params` before accessing properties
