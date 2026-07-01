"use client";

import { Reveal } from "@/components/motion";
import { DynamicIcon } from "@/lib/icons";
import { siteConfig } from "@/content/site";

export function MissionVisionSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="grid gap-5 sm:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-card p-8 sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <DynamicIcon name="Target" className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">Mission</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{siteConfig.mission}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-brand-blue p-8 text-white sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
              <DynamicIcon name="Compass" className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">Vision</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-blue-foreground">{siteConfig.vision}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
