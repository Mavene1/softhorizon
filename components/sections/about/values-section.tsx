"use client";

import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/common/section-header";
import { DynamicIcon } from "@/lib/icons";
import { companyValues } from "@/content/values";

export function ValuesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <Reveal>
        <SectionHeader overline="What we believe" title="The values behind every project" />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {companyValues.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <DynamicIcon name={value.icon} className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
