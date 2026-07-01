import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/common/section-header";
import { ProjectCard } from "@/components/common/project-card";

export function ProjectsPreview() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
        <SectionHeader overline="Selected work" title="Real products, measurable results" />
        <Link href="/projects" className="text-sm font-semibold text-primary hover:underline">
          All case studies →
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
