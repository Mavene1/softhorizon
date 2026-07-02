"use client";

import Link from "next/link";
import { FadeUp, StaggerContainer, motion } from "@/components/motion";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Button } from "@/components/ui/button";
import { impactStats, siteConfig } from "@/content/site";

function AccentUnderline() {
  return (
    <motion.svg
      className="pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full text-primary"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M2 7.5 Q 50 1.5 98 7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.55, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function Headline() {
  const { heroHeadline, heroHeadlineAccent } = siteConfig;
  const accentIndex = heroHeadlineAccent ? heroHeadline.indexOf(heroHeadlineAccent) : -1;

  if (accentIndex === -1) {
    return <>{heroHeadline}</>;
  }

  const before = heroHeadline.slice(0, accentIndex);
  const after = heroHeadline.slice(accentIndex + heroHeadlineAccent.length);

  return (
    <>
      {before}
      <span className="relative inline-block">
        {heroHeadlineAccent}
        <AccentUnderline />
      </span>
      {after}
    </>
  );
}

export function HeroSection() {
  const heroStat = impactStats[0];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow [--glow-x:78%] [--glow-y:18%]" aria-hidden />
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
              <Headline />
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
          <div
            className="absolute -top-14 -right-14 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-16 -left-14 h-56 w-56 rounded-full bg-brand-blue/40 blur-3xl"
            aria-hidden
          />

          <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
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

          <motion.div
            className="absolute -top-6 -right-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div>
              <div className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                {heroStat.label}
              </div>
              <div className="mt-0.5 text-lg font-bold text-primary">
                <AnimatedCounter target={heroStat.target} suffix={heroStat.suffix} />
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
