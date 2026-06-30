# Animations

## Rule: Always Import via `@/components/motion`

Never import from `"framer-motion"` directly. All framer-motion usage goes through `components/motion.tsx`:

```tsx
// ✅ correct
import { FadeUp, StaggerContainer, motion, AnimatePresence } from "@/components/motion";

// ❌ wrong
import { motion, AnimatePresence } from "framer-motion";
```

This ensures only used APIs are bundled and provides a single place to change animation defaults.

## Available Exports from `@/components/motion`

```ts
// Primitives re-exported from framer-motion
export { motion, AnimatePresence, useInView, useAnimation, useMotionValue, useTransform, useSpring, LayoutGroup, Reorder }

// Pre-built wrappers
export function FadeUp({ delay?, children, ...props })         // fade + slide up on mount
export function StaggerContainer({ staggerDelay?, children, ...props }) // staggers children
```

## Common Animation Patterns

### Scroll-Triggered Reveal

The most common animation pattern — elements fade in as the user scrolls to them:

```tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "@/components/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Card Grid

Cards entering the viewport one after another:

```tsx
"use client";
import { motion, useInView } from "@/components/motion";
import { useRef } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <motion.div key={project.slug} variants={item}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Hero Section with Stagger

```tsx
"use client";
import { FadeUp, StaggerContainer } from "@/components/motion";
import { siteConfig } from "@/content/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden">
      {/* Background decoration — not animated, no "use client" needed there */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" aria-hidden />

      <StaggerContainer className="container mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary mb-6">
            {siteConfig.shortTagline}
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="text-5xl font-bold leading-tight lg:text-7xl tracking-tight">
            {siteConfig.heroHeadline}
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.heroSubtitle}
          </p>
        </FadeUp>
        <FadeUp delay={0.24} className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Work With Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">View Our Work</Link>
          </Button>
        </FadeUp>
      </StaggerContainer>
    </section>
  );
}
```

### Page Transition (Layout-Level)

Smooth page transitions via the root layout:

```tsx
// app/layout.tsx — wrap children in AnimatePresence
"use client";
import { AnimatePresence, motion } from "@/components/motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Number Counter Animation (Stats)

```tsx
"use client";
import { useInView, useMotionValue, useSpring } from "@/components/motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ target, suffix = "", prefix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
```

### Hover Card Lift

Simple hover effect for cards:

```tsx
"use client";
import { motion } from "@/components/motion";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border bg-card p-8"
    >
      {/* card content */}
    </motion.div>
  );
}
```

## When to Use `"use client"` for Animations

All framer-motion components that use hooks (`useInView`, `useAnimation`, etc.) or have `animate`/`whileHover` props that respond to user interaction **must be Client Components**.

Purely mount-time animations (e.g. `FadeUp` with a fixed `initial` and `animate`) also need `"use client"` because framer-motion uses React hooks internally.

```
Section needs scroll-triggered animation → "use client"
Section has hover/tap interactions       → "use client"
Section is purely static content         → Server Component (no "use client")
```

Keep the data-fetching (reading from `content/`) in the Server Component parent, and pass the data down to the Client Component that handles animation:

```tsx
// Server Component — reads data
// components/sections/projects/projects-grid-wrapper.tsx
import { projects } from "@/content/projects";
import { ProjectsGrid } from "./projects-grid"; // ← Client Component

export function ProjectsGridWrapper() {
  const featured = projects.filter((p) => p.featured);
  return <ProjectsGrid projects={featured} />;
}

// Client Component — handles animation
// components/sections/projects/projects-grid.tsx
"use client";
import { motion, useInView } from "@/components/motion";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  // ... animation logic
}
```

## Animation Timing Conventions

| Context | Duration | Ease |
|---|---|---|
| Page transition (fade) | 200ms | linear |
| Element reveal (scroll) | 400–500ms | `easeOut` or `[0.25, 0.1, 0.25, 1]` |
| Hover lift | 200ms | default |
| Stagger delay between children | 60–100ms | — |
| Hero elements stagger | 80ms per element | — |
| Counter spring | `damping: 40, stiffness: 80` | — |

## `framer-motion` v12 Notes

- `motion` is imported as a named export (same as before)
- Layout animations use `layout` prop on `motion.*` elements
- `AnimatePresence` requires `mode="wait"` for sequential page transitions
- `useInView` is now built into framer-motion (previously needed separate import)

## Do NOT

- Import from `"framer-motion"` directly — use `@/components/motion`
- Put framer-motion animations in Server Components — they require `"use client"`
- Animate every element on a page — use restraint; too many animations degrade UX and performance
- Use `animate` on elements that are not visible on first render without `once: true` on `useInView`
- Put data fetching inside `"use client"` animation components — pass data as props from a Server Component parent
