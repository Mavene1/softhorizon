import { HeroSection } from "./hero-section";
import { ServicesPreview } from "./services-preview";
import { ProjectsPreview } from "./projects-preview";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <ProjectsPreview />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
