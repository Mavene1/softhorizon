import { ChangelogList } from "@/components/sections/changelog/changelog-list";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Changelog",
  description: "Company and product updates from SoftHorizon, newest first.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return <ChangelogList />;
}
