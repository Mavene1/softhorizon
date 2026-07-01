"use client";

import Link from "next/link";
import { FadeUp, StaggerContainer } from "@/components/motion";
import { Button } from "@/components/ui/button";
import type { Solution } from "@/content/solutions";

export function SolutionHero({ solution }: { solution: Solution }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,color-mix(in_oklab,var(--primary),white_85%),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
        <StaggerContainer>
          <FadeUp>
            <Link href="/solutions" className="text-sm font-semibold text-primary hover:underline">
              ← Solutions
            </Link>
          </FadeUp>
          <FadeUp delay={0.08}>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              {solution.persona}
            </span>
          </FadeUp>
          <FadeUp delay={0.16}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
              {solution.headline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.24}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{solution.subheadline}</p>
          </FadeUp>
          <FadeUp delay={0.32} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={solution.cta.primary.href}>{solution.cta.primary.label}</Link>
            </Button>
            {solution.cta.secondary && (
              <Button asChild size="lg" variant="outline">
                <Link href={solution.cta.secondary.href}>{solution.cta.secondary.label}</Link>
              </Button>
            )}
          </FadeUp>
        </StaggerContainer>
      </div>
    </section>
  );
}
