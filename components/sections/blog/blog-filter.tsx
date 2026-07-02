"use client";

import { useState } from "react";
import type { BlogPostFrontmatter, BlogCategory } from "@/lib/blog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostCard } from "./blog-post-card";
import { categoryLabels } from "./category-labels";

export function BlogFilter({ posts }: { posts: BlogPostFrontmatter[] }) {
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const [active, setActive] = useState<BlogCategory | "all">("all");
  const filtered = active === "all" ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      <Tabs value={active} onValueChange={(value) => setActive(value as BlogCategory | "all")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {categoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
