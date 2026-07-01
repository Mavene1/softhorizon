import { testimonials } from "@/content/testimonials";
import { SectionHeader } from "@/components/common/section-header";
import { TestimonialCard } from "@/components/common/testimonial-card";

export function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-11">
        <SectionHeader overline="Customer stories" title="Outcomes our clients feel" align="center" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
