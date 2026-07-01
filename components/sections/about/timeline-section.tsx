"use client";

import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/common/section-header";
import { milestones } from "@/content/site";

export function TimelineSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <Reveal>
        <SectionHeader overline="Milestones" title="How we got here" />
      </Reveal>
      <div className="mt-12 flex flex-col">
        {milestones.map((milestone, index) => (
          <Reveal key={milestone.year} delay={index * 0.06} className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
              {index < milestones.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
            </div>
            <div className="pb-10">
              <div className="text-sm font-semibold tracking-wide text-primary uppercase">{milestone.year}</div>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{milestone.title}</h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
