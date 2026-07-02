import { WhitepapersGrid } from "@/components/sections/resources/whitepapers-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Whitepapers",
  description: "In-depth reports on government modernisation, fintech compliance, and scaling logistics software.",
  path: "/resources/whitepapers",
});

export default function WhitepapersPage() {
  return <WhitepapersGrid />;
}
