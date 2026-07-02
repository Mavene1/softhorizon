import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { projects, categoryLabels } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/common/project-card";
import { CtaStrip } from "@/components/common/cta-strip";

export function ProjectDetailSections({ project }: { project: Project }) {
  const related = projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/projects" className="text-sm font-semibold text-primary hover:underline">
          ← All projects
        </Link>
        <div className="mt-6">
          <div className="text-sm font-semibold tracking-wide text-primary uppercase">
            {project.client} · {categoryLabels[project.category]} · {project.year}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{project.title}</h1>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {project.results && project.results.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Results</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {project.results.map((result) => (
                <div key={result.metric} className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-3xl font-bold tracking-tight text-primary">{result.value}</div>
                  <div className="mt-2 text-sm font-semibold">{result.metric}</div>
                  {result.description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{result.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Ready to build something like this?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Start a project", href: "/contact" }}
          secondaryCta={{ label: "See all services", href: "/services" }}
        />
      </section>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">More work</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
