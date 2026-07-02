"use client";

import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/common/section-header";
import { siteConfig } from "@/content/site";

export function StorySection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-glow [--glow-x:12%] [--glow-y:10%] [--glow-tint:88%]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
        <Reveal>
          <SectionHeader overline="Our story" title={`Since ${siteConfig.founded}, built from ${siteConfig.location}`} />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteConfig.story.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
              <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
