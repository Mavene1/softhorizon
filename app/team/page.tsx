import { TeamGrid } from "@/components/sections/team/team-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Team",
  description: "Meet the engineers, designers, and delivery leads behind SoftHorizon's client work.",
  path: "/team",
});

export default function TeamPage() {
  return <TeamGrid />;
}
