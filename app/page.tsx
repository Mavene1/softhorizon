import { HomeSections } from "@/components/sections/home";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.heroSubtitle,
  path: "/",
});

export default function Home() {
  return <HomeSections />;
}
