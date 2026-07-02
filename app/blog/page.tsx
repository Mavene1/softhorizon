import { BlogGrid } from "@/components/sections/blog/blog-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Engineering notes and product thinking from the SoftHorizon team.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogGrid />;
}
