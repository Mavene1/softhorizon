# State Management

## Overview

This is a public company website with no user accounts. Most content is static (imported from `content/`). The only meaningful runtime state is:

| State | Where | Tool |
|---|---|---|
| Mobile menu open/closed | Zustand / `useDisclosure` | ephemeral UI |
| Dark/light theme | `next-themes` ThemeProvider | persisted (localStorage) |
| Contact form submission | `useMutation` + local form state | TanStack Query |

**There is no auth state, no user session state, no complex per-user feature state** — this site has no accounts. If you find yourself reaching for Zustand for something beyond mobile nav / search dialog state, ask whether it should instead be server-rendered or driven by `content/`.

## UI Store (Minimal)

`store/ui-store.ts` — only for state that genuinely needs to cross component boundaries:

```ts
// store/ui-store.ts
import { create } from "zustand";

interface UiState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
}));
```

No `persist` needed — mobile menu state is ephemeral.

## Theme

Dark/light mode is owned by `next-themes` — no Zustand needed:

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Reading/setting theme in components:

```tsx
"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
```

## Shared UI Hooks (`hooks/ui/`)

### `useDisclosure`

Single open/close toggle. The primary primitive for mobile menu, dialogs, and popovers:

```ts
// hooks/ui/use-disclosure.ts
import { useCallback, useState } from "react";

export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, onOpen, onClose, toggle };
}
```

Usage for mobile menu:

```tsx
"use client";
import { useDisclosure } from "@/hooks/ui/use-disclosure";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <nav>
      <button onClick={onOpen} aria-label="Open menu">Menu</button>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </nav>
  );
}
```

### `useInView`

For scroll-triggered animations — use the one from `@/components/motion` (framer-motion's built-in):

```tsx
"use client";
import { useRef } from "react";
import { useInView } from "@/components/motion";

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // ...
}
```

## Contact Form State

The contact form is the only place that uses `useMutation` (TanStack Query) and React Hook Form:

```ts
// features/contact/hooks/use-contact-form.ts
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

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (result) => {
      if (!result.success) { toast.error(result.error ?? "Failed to send"); return; }
      toast.success("Message sent! We'll be in touch soon.");
      form.reset();
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  function handleSubmit(values: ContactFormValues) {
    mutate(values);
  }

  return { form, handleSubmit: form.handleSubmit(handleSubmit), isPending, isSuccess };
}
```

## Decision Map

| Situation | Use |
|---|---|
| Mobile nav open/close | `useDisclosure` hook |
| Theme (dark/light) | `next-themes` `useTheme` |
| Scroll animation trigger | `useInView` from `@/components/motion` |
| Contact form state | `useForm` (RHF) in `use-contact-form.ts` |
| Contact form submission | `useMutation` (TanStack Query) |
| Displaying content | Import from `content/` in Server Component — no state needed |
| Animation state | framer-motion variants — no React state needed |

## Zustand v5 Notes

- `useShallow` imports from `zustand/react/shallow` (not `zustand/shallow`)
- Store creation: `create<State>((set) => ({ ... }))`
- Persist: `create<State>()(persist((set) => ({ ... }), { name: "key", partialize: ... }))`

## Do NOT

- Put content data in Zustand — import it directly from `content/` in Server Components
- Create Zustand stores for things a Server Component can handle
- Use TanStack Query to fetch data from `content/` — they are static imports
- Add auth state, user session state, or per-user feature state — this site has no accounts
- Import `useShallow` from `zustand/shallow` — use `zustand/react/shallow` (Zustand v5)
