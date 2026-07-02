import { JobsList } from "@/components/sections/careers/jobs-list";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Open roles across engineering, design, and delivery at SoftHorizon.",
  path: "/careers",
});

export default function CareersPage() {
  return <JobsList />;
}
