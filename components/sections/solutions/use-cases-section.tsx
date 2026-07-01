"use client";

import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/common/section-header";
import { DynamicIcon } from "@/lib/icons";
import type { Solution } from "@/content/solutions";

export function UseCasesSection({ solution }: { solution: Solution }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <Reveal>
        <SectionHeader overline="Where we help" title={`Built for ${solution.persona.toLowerCase()}`} />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {solution.useCases.map((useCase, index) => (
          <Reveal key={useCase.title} delay={index * 0.06}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <DynamicIcon name={useCase.icon} className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight">{useCase.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
