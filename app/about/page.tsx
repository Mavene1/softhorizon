import { AboutSections } from "@/components/sections/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Softhorizon is a software engineering partner founded in Nairobi in 2020 — our story, mission, vision, and values.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutSections />;
}
