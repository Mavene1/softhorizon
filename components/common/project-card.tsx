import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const primaryResult = project.results?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
          {project.tags[0]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        {primaryResult && (
          <div className="mt-5 flex items-baseline gap-2 border-t border-border pt-4">
            <span className="text-2xl font-bold tracking-tight text-primary">{primaryResult.value}</span>
            <span className="text-xs text-muted-foreground">{primaryResult.metric}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
