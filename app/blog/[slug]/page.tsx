import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { BlogPostLayout } from "@/components/sections/blog/blog-post-layout";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    path: `/blog/${slug}`,
    image: post.frontmatter.coverImage,
  });
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.frontmatter.published) notFound();
  return <BlogPostLayout post={post} />;
}
