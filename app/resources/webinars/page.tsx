import { WebinarsGrid } from "@/components/sections/resources/webinars-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Webinars",
  description: "Recordings and upcoming live sessions from the SoftHorizon team.",
  path: "/resources/webinars",
});

export default function WebinarsPage() {
  return <WebinarsGrid />;
}
