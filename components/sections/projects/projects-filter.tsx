"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { categoryLabels } from "@/content/projects";
import { ProjectCard } from "@/components/common/project-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const filtered = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <Tabs value={active} onValueChange={(value) => setActive(value as ProjectCategory | "all")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {categoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
