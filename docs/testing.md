# Testing

## What to Test

Most of the site is Server Components rendering static `content/` data — TypeScript covers structural correctness at compile time. The runtime logic worth unit-testing is:

| Target | Test type | Location |
|---|---|---|
| Utility functions (`lib/utils.ts`, `lib/metadata.ts`) | Pure function unit tests | Co-located |
| Form schemas (`schemas.ts`) | Zod parse/safeParse assertions | Co-located next to schema |
| Custom hooks (`hooks/ui/*.ts`, contact form hook) | `renderHook` + `act` | Co-located next to hook |
| Server Actions | Integration test (mock email service) | Co-located in `__tests__/` |

**Do not test:**
- shadcn/ui primitives — tested upstream
- Static content files (`content/*.ts`) — TypeScript type-checks structure at compile time
- Section components that only render `content/` data — no logic to test; TypeScript covers the types
- Server Components that don't have branching logic

**Coverage target:** 100% on utility functions and schemas. Hooks and Server Actions on a best-effort basis.

## Zod Schema Tests

```ts
// components/sections/contact/schemas.test.ts
import { ContactSchema } from "./schemas";

describe("ContactSchema", () => {
  it("accepts valid input", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Smith",
      email: "jane@company.com",
      subject: "Project inquiry",
      message: "We'd like to discuss a new project with you.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = ContactSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      subject: "Project",
      message: "A sufficiently long message here.",
    });
    expect(result.success).toBe(false);
  });
});
```

## Hook Tests with TanStack Query

When testing hooks that use `useMutation`, wrap with a QueryClient provider and set `gcTime: 0`:

```tsx
// hooks/__tests__/use-contact-form.test.tsx
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContactForm } from "@/components/sections/contact/hooks/use-contact-form";

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { mutations: { gcTime: 0 } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

it("starts not pending", () => {
  const { result } = renderHook(() => useContactForm(), { wrapper: createWrapper() });
  expect(result.current.isPending).toBe(false);
});
```

## No Storybook

This project does not use Storybook — shadcn/ui primitives are tested upstream and page sections are best reviewed live. Visual review happens in the browser during development (`pnpm dev`).
