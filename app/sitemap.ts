import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { projects } from "@/content/projects";
import { teamMembers } from "@/content/team";
import { jobListings } from "@/content/careers";
import { glossaryTerms } from "@/content/glossary";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/resources/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/whitepapers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/webinars`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/security`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((m) => ({
    url: `${base}/team/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const careerRoutes: MetadataRoute.Sitemap = jobListings.map((j) => ({
    url: `${base}/careers/${j.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${base}/glossary/${t.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...solutionRoutes,
    ...projectRoutes,
    ...teamRoutes,
    ...careerRoutes,
    ...glossaryRoutes,
    ...blogRoutes,
  ];
}
