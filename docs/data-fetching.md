# Data Fetching

## The 90% Rule

On this site, **90% of "data fetching" is just importing a TypeScript file**. Team profiles, services, projects, testimonials, values, blog posts, careers, pricing — all live in `content/` and are imported directly in Server Components. No hooks, no loading states, no network requests at build time.

TanStack Query is reserved for **form mutations** (contact form, job applications, newsletter, whitepaper gates) and any future genuinely remote data.

## The Static Pattern (Most Content)

Read data at component render time by importing directly from `content/`:

```tsx
// components/sections/projects/projects-grid.tsx — Server Component
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function ProjectsGrid() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sorted.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

No `useState`, no `useEffect`, no `isLoading` check, no skeleton. This component runs on the server at build time (static generation) or on request.

## Contact Form — The One Place for TanStack Query

The contact form uses `useMutation` for the form submission:

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
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Failed to send message");
        return;
      }
      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  return {
    form,
    handleSubmit: form.handleSubmit((values) => mutate(values)),
    isPending,
  };
}
```

The Server Action for form submission:

```ts
// components/sections/contact/actions.ts
"use server";
import { ContactSchema, type ContactFormValues } from "./schemas";

export async function submitContactForm(values: ContactFormValues) {
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

## TanStack Query v5 Quick Reference

Only needed for mutations (contact form). Key API differences from v4:

| v4 (old) | v5 (new) |
|---|---|
| `useMutation(mutationFn, opts)` | `useMutation({ mutationFn, ...opts })` |
| `isLoading` | `isPending` |
| `cacheTime` | `gcTime` |
| `onSuccess` on `useQuery` | removed — use `useEffect` or `select` |

```ts
// ✅ v5 mutation syntax
const { mutate, isPending } = useMutation({
  mutationFn: submitContactForm,
  onSuccess: (result) => { ... },
  onError: () => { ... },
});

// ❌ v4 syntax (will error)
const { mutate, isLoading } = useMutation(submitContactForm, {
  onSuccess: () => { ... },
});
```

## `lib/query-client.ts`

Exports two things — read the comments before using either:

```ts
import { QueryClient } from "@tanstack/react-query";

// Factory — one new client per call. Use in Server Components for SSR prefetching,
// and in providers/index.tsx via useState() when SSR prefetching is active.
export function makeQueryClient(): QueryClient

// Singleton — browser-only, safe because providers/index.tsx is "use client"
// and TanStack Query is currently only used for mutations.
export const queryClient: QueryClient
```

**Current usage:** `providers/index.tsx` imports the singleton `queryClient`. This is correct while TanStack Query is only used for form mutations.

---

## When You Might Need `useQuery`

If the project adds dynamic data from a remote source (headless CMS, partner API, etc.):

```ts
// Only use useQuery for genuinely dynamic, remote data — not for content/ imports
const { data, isPending } = useQuery({
  queryKey: ["blog-posts"],
  queryFn: () => fetchBlogPosts(),
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});
```

Until then: import directly from `content/`. Do not create API routes to serve data that already exists as TypeScript files.

---

## SSR Prefetching with `HydrationBoundary` (future pattern)

Use this pattern when you need data server-rendered into the HTML for SEO or performance — e.g., dynamically fetched blog posts from a CMS, or job listings from an external ATS.

### Step 1 — Switch `providers/index.tsx` to per-instance client

The module-level singleton must be replaced with `useState` so each component instance gets its own client. This prevents cross-request data bleed on the server.

```tsx
// providers/index.tsx
"use client";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { makeQueryClient } from "@/lib/query-client";
import { PHProvider } from "./posthog";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState with initializer — one client per component instance, stable across re-renders
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PHProvider>
        {children}
      </PHProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

Replace the `import { queryClient }` singleton import with `useState(() => makeQueryClient())`. The `queryClient` singleton export in `lib/query-client.ts` can then be removed.

### Step 2 — Prefetch in a Server Component

```tsx
// app/blog/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/query-client";
import { BlogGrid } from "@/components/sections/blog/blog-grid";

export default async function BlogPage() {
  const queryClient = makeQueryClient();           // new client per request — safe on server

  await queryClient.prefetchQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,                       // your CMS/API fetch function
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogGrid />
    </HydrationBoundary>
  );
}
```

### Step 3 — Read in the Client Component

```tsx
// components/sections/blog/blog-grid.tsx
"use client";
import { useQuery } from "@tanstack/react-query";

export function BlogGrid() {
  const { data: posts, isPending } = useQuery({
    queryKey: ["blog-posts"],          // must match the prefetch key exactly
    queryFn: fetchBlogPosts,
  });

  if (isPending) return <BlogGridSkeleton />;
  return <div>{posts?.map(post => <BlogPostCard key={post.slug} post={post} />)}</div>;
}
```

The prefetched data from the server is hydrated into the client cache — no loading state on first render.

### When to activate this pattern

| Trigger | Action |
|---|---|
| Adding `useQuery` for remote CMS/API data | Switch `providers/index.tsx` to `useState(() => makeQueryClient())` |
| Using `prefetchQuery` in a Server Component | Create per-request client with `makeQueryClient()` |
| Adding `HydrationBoundary` | Both of the above are required |

Do not activate this pattern just for reading from `content/` — static imports are always faster than prefetching.

## Do NOT

- Use TanStack Query to read from `content/` — they are static TypeScript imports
- Create `/api/` routes to serve data that already exists in `content/`
- Add loading skeletons for static content that doesn't need them
- Use `cacheTime` — it was renamed to `gcTime` in v5
- Use `isLoading` — use `isPending` in TanStack Query v5
- Add `onSuccess`/`onError` to `useQuery` options — they were removed in v5 (still available on `useMutation`)
