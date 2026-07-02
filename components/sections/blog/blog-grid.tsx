import { getAllPosts } from "@/lib/blog";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { BlogFilter } from "./blog-filter";

export function BlogGrid() {
  const posts = getAllPosts().map((post) => post.frontmatter);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Blog"
          title="Engineering notes and product thinking"
          subtitle="What we're learning from building software for government, fintech, and logistics clients."
        />
        <div className="mt-12">
          <BlogFilter posts={posts} />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Have a project in mind?"
          subtext="Tell us what you're building and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
