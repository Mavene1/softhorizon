import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { ProjectsFilter } from "./projects-filter";

export function ProjectsGrid() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Our work"
          title="Real products, measurable results"
          subtitle="A selection of engagements across government, fintech, and logistics — each one shipped end-to-end by our team."
        />
        <div className="mt-12">
          <ProjectsFilter projects={sorted} />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Have a project in mind?"
          subtext="Tell us what you're building and we'll get back to you within one business day."
          primaryCta={{ label: "Start a project", href: "/contact" }}
          secondaryCta={{ label: "See our services", href: "/services" }}
        />
      </section>
    </>
  );
}
