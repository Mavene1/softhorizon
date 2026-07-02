import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChangelogType = "feature" | "fix" | "improvement" | "announcement";

export interface ChangelogEntryFrontmatter {
  title: string;
  date: string;
  version?: string;
  type: ChangelogType;
}

export interface ChangelogEntry {
  frontmatter: ChangelogEntryFrontmatter;
  content: string;
}

const CHANGELOG_DIR = path.join(process.cwd(), "content/changelog");

/** All changelog entries, newest first, with their raw MDX bodies (short — rendered inline, no detail route). */
export function getAllChangelogEntries(): ChangelogEntry[] {
  const filenames = fs.readdirSync(CHANGELOG_DIR).filter((name) => name.endsWith(".mdx"));
  return filenames
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CHANGELOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return { frontmatter: data as ChangelogEntryFrontmatter, content };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
