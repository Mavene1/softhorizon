import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { BlogPostFrontmatter } from "@/lib/blog";
import { teamMembers } from "@/content/team";
import { Badge } from "@/components/ui/badge";
import { categoryLabels } from "./category-labels";

export function BlogPostCard({ post }: { post: BlogPostFrontmatter }) {
  const author = teamMembers.find((member) => member.slug === post.author);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={`${post.title} cover`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="outline" className="w-fit">
          {categoryLabels[post.category]}
        </Badge>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          {author && <span>{author.name}</span>}
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
