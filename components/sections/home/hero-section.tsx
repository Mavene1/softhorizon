"use client";

import Link from "next/link";
import { FadeUp, StaggerContainer } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,color-mix(in_oklab,var(--primary),white_82%),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <StaggerContainer>
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              {siteConfig.shortTagline}
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {siteConfig.heroHeadline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{siteConfig.heroSubtitle}</p>
          </FadeUp>
          <FadeUp delay={0.24} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                See our work <span className="text-primary">→</span>
              </Link>
            </Button>
          </FadeUp>
        </StaggerContainer>

        <FadeUp delay={0.3} className="relative hidden lg:block">
          <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="ml-2 text-xs text-muted-foreground">project · client-portal</span>
            </div>
            <div className="p-5">
              <div className="mb-3.5 flex gap-3">
                <div className="flex-1 rounded-xl border border-border bg-muted/60 p-3.5">
                  <div className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Deploys
                  </div>
                  <div className="mt-1.5 text-xl font-bold">1,284</div>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-muted/60 p-3.5">
                  <div className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Uptime
                  </div>
                  <div className="mt-1.5 text-xl font-bold text-primary">99.99%</div>
                </div>
              </div>
              <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-[repeating-linear-gradient(135deg,var(--muted)_0px,var(--muted)_11px,transparent_11px,transparent_22px)]">
                <span className="text-xs text-muted-foreground">delivery &amp; release dashboard</span>
              </div>
              <div className="mt-3.5 flex items-center gap-2.5">
                <span className="text-xs text-muted-foreground">Sprint 24</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full w-[86%] rounded-full bg-primary" />
                </span>
                <span className="text-xs text-muted-foreground">86%</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-6 flex items-center gap-2.5 rounded-xl bg-brand-blue px-4 py-3 text-white shadow-xl">
            <span className="block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)]" />
            <div>
              <div className="text-[10px] font-semibold tracking-wide text-brand-blue-foreground uppercase">
                Status
              </div>
              <div className="text-sm font-semibold">Shipped to production</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
