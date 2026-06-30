import { QueryClient } from "@tanstack/react-query";

const defaultOptions = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
} as const;

// Factory — use this in Server Components for per-request instances (HydrationBoundary pattern)
// and in providers/index.tsx via useState(() => makeQueryClient()) when SSR prefetching is active.
export function makeQueryClient() {
  return new QueryClient(defaultOptions);
}

// Singleton — browser-only. Safe because providers/index.tsx is "use client" and
// TanStack Query is currently used only for mutations (contact form, newsletter).
// Switch providers/index.tsx to useState(() => makeQueryClient()) if SSR prefetching is added.
export const queryClient = new QueryClient(defaultOptions);
