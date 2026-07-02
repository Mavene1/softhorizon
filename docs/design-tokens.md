# Design Tokens & Theming

## Overview

Colors and design tokens are defined as CSS custom properties in `app/globals.css`. Dark mode is managed by `next-themes`. The `@theme inline` block maps CSS variables to Tailwind utility classes.

## Tailwind v4: CSS-First Configuration

There is **no `tailwind.config.js`**. All theme customization is done via `@theme` in CSS:

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... */
}
```

**`@theme inline`** resolves CSS variable values at build time, creating Tailwind utilities:
- `--color-primary: var(--primary)` → `bg-primary`, `text-primary`, `border-primary`, etc.

**`@theme` (without `inline`)** creates both utilities AND CSS variables in the output. Use `@theme inline` when referencing existing CSS variables.

## Shadcn/ui CSS Variables

Shadcn/ui uses semantic CSS variables. These live in `app/globals.css` under `:root` (light) and `.dark` (dark mode):

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  /* chart-1 through chart-5 */
  /* sidebar variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark overrides */
}
```

## Dark Mode with `next-themes`

Dark mode is controlled by the `next-themes` `ThemeProvider`. The `.dark` class is applied to `<html>` by next-themes.

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` is required on `<html>` — next-themes modifies the `class` attribute before hydration.

### Reading/setting theme in components

```tsx
"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

## Using Tokens in Components

Always use CSS variables or Tailwind utilities — never hardcode hex/oklch values:

```tsx
// ✅ Correct
className="bg-background text-foreground"
className="border-border"
className="bg-primary text-primary-foreground"
className="text-muted-foreground"
style={{ color: "var(--primary)" }}

// ❌ Wrong — hardcoded values will drift from theme
style={{ color: "#000000" }}
className="text-[oklch(0.205_0_0)]"
```

## Available Token Classes (via @theme inline)

| Category | Tailwind utilities |
|---|---|
| Background | `bg-background`, `bg-card`, `bg-popover`, `bg-primary`, `bg-secondary`, `bg-muted`, `bg-accent` |
| Text | `text-foreground`, `text-primary`, `text-secondary`, `text-muted-foreground`, `text-primary-foreground` |
| Border | `border-border`, `ring-ring` |
| Destructive | `bg-destructive`, `text-destructive` |
| Charts | `bg-chart-1` through `bg-chart-5` |
| Sidebar | `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border` |
| Radius | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` (computed from `--radius`) |

## Reusable Gradients via `@utility`

Don't repeat `bg-[radial-gradient(...)]` arbitrary values across sections. Define the pattern once in `globals.css` with `@utility`, parameterized by CSS custom properties, and apply position/tint per usage with Tailwind's arbitrary-property syntax:

```css
/* app/globals.css */
@utility bg-glow {
  background-image: radial-gradient(
    circle at var(--glow-x, 50%) var(--glow-y, 20%),
    color-mix(in oklab, var(--primary), white var(--glow-tint, 82%)),
    transparent 45%
  );
}
```

```tsx
<div className="pointer-events-none absolute inset-0 bg-glow [--glow-x:78%] [--glow-y:18%]" aria-hidden />
```

Used for the soft ambient hero/section glow (`hero-section.tsx`, `story-section.tsx`, `solution-hero.tsx`). Only promote a gradient string to a `@utility` once it's repeated in 2+ places — a one-off decorative gradient (e.g. the diagonal-stripe placeholder in the hero mock card) stays inline.

## Adding Custom Brand Tokens

To add project-specific color tokens, extend `globals.css`:

```css
:root {
  /* existing shadcn vars... */

  /* Project brand tokens */
  --brand-primary: oklch(0.72 0.18 160);
  --brand-secondary: oklch(0.85 0.1 160);
  --surface-page: oklch(0.98 0 0);
}

.dark {
  --brand-primary: oklch(0.65 0.18 160);
  --surface-page: oklch(0.15 0 0);
}
```

Then map to Tailwind utilities in `@theme inline`:

```css
@theme inline {
  /* existing shadcn mappings... */
  --color-brand-primary: var(--brand-primary);
  --color-surface-page: var(--surface-page);
}
```

This creates `bg-brand-primary`, `text-brand-primary`, etc.

## Typography

Configure font families in `@theme` or `@theme inline`:

```css
@theme inline {
  --font-sans: var(--font-inter);    /* references a Next.js font variable */
  --font-heading: var(--font-inter);
}
```

For custom fonts served from `public/fonts/`, declare `@font-face` before `@theme`:

```css
@font-face {
  font-family: "CustomFont";
  src: url("/fonts/CustomFont-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@theme inline {
  --font-sans: "CustomFont", sans-serif;
}
```

## Next.js Image Sizing

Tailwind v4 preflight sets `height: auto` on all `<img>`. The `<Image>` `height` prop must match the natural pixel height at the given `width`:

```
height = Math.round(width * naturalHeight / naturalWidth)
```

Check actual dimensions: `sips -g pixelWidth -g pixelHeight <file>`

Every `fill` image must have a `sizes` prop.

## Do NOT

- Edit brand colors directly in `:root` as hardcoded oklch values — centralise in CSS variables
- Hardcode hex or oklch values in component `className` or `style` props
- Use `tailwind.config.js` — Tailwind v4 is CSS-first; use `@theme` in `globals.css`
- Add `@tailwind base/components/utilities` directives — use `@import "tailwindcss"` (v4)
- Edit `components/ui/` shadcn files for styling — regenerate via CLI
