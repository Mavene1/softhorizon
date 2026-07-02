import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogCategory = "engineering" | "design" | "business" | "culture";

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  summary: string;
  coverImage: string;
  readingTime: number;
  published: boolean;
}

export interface BlogPostSummary {
  frontmatter: BlogPostFrontmatter;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function readPostFile(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as BlogPostFrontmatter, content };
}

/** All published posts, frontmatter only, sorted newest first. Safe for index/listing pages. */
export function getAllPosts(): BlogPostSummary[] {
  const filenames = fs.readdirSync(BLOG_DIR).filter((name) => name.endsWith(".mdx"));
  return filenames
    .map((filename) => readPostFile(filename))
    .filter((post) => post.frontmatter.published)
    .map(({ frontmatter }) => ({ frontmatter }))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

/** Single post with its raw MDX body, for the detail page. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const filenames = fs.readdirSync(BLOG_DIR).filter((name) => name.endsWith(".mdx"));
  for (const filename of filenames) {
    const post = readPostFile(filename);
    if (post.frontmatter.slug === slug) return post;
  }
  return undefined;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.frontmatter.slug);
}
