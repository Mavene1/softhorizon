import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog";
import { teamMembers } from "@/content/team";
import { Badge } from "@/components/ui/badge";
import { CtaStrip } from "@/components/common/cta-strip";
import { categoryLabels } from "./category-labels";
import { AuthorCard } from "./author-card";
import { BlogPostCard } from "./blog-post-card";
import { blogMdxComponents } from "./blog-mdx-components";

export function BlogPostLayout({ post }: { post: BlogPost }) {
  const { frontmatter, content } = post;
  const author = teamMembers.find((member) => member.slug === frontmatter.author);
  const related = getAllPosts()
    .map((p) => p.frontmatter)
    .filter((p) => p.slug !== frontmatter.slug && p.category === frontmatter.category)
    .slice(0, 3);

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-6 py-20">
        <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
          ← All posts
        </Link>

        <div className="mt-6">
          <Badge variant="outline">{categoryLabels[frontmatter.category]}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{frontmatter.title}</h1>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          {author && <span>{author.name}</span>}
          <span aria-hidden>·</span>
          <time dateTime={frontmatter.date}>{format(new Date(frontmatter.date), "MMMM d, yyyy")}</time>
          <span aria-hidden>·</span>
          <span>{frontmatter.readingTime} min read</span>
        </div>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
          <Image
            src={frontmatter.coverImage}
            alt={`${frontmatter.title} cover`}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-10">
          <MDXRemote source={content} components={blogMdxComponents} />
        </div>

        {frontmatter.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {author && (
          <div className="mt-10">
            <AuthorCard author={author} />
          </div>
        )}
      </article>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want to talk through any of this?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">More on this topic</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogPostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
