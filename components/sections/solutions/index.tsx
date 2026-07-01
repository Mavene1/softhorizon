import type { Solution } from "@/content/solutions";
import { projects } from "@/content/projects";
import { SolutionHero } from "./solution-hero";
import { UseCasesSection } from "./use-cases-section";
import { SectionHeader } from "@/components/common/section-header";
import { ProjectCard } from "@/components/common/project-card";
import { CtaStrip } from "@/components/common/cta-strip";

export function SolutionSections({ solution }: { solution: Solution }) {
  const featuredProjects = projects.filter((p) => solution.featuredProjects?.includes(p.slug));

  return (
    <>
      <SolutionHero solution={solution} />
      <UseCasesSection solution={solution} />

      {featuredProjects.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <SectionHeader overline="Proof" title="Related work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline={`Ready to build for ${solution.persona.toLowerCase()}?`}
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={solution.cta.primary}
          secondaryCta={solution.cta.secondary}
        />
      </section>
    </>
  );
}
