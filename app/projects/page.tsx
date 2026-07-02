import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Case studies from our work across government, fintech, and logistics — problem, solution, and results.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
