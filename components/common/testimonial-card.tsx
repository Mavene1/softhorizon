import type { Testimonial } from "@/content/testimonials";
import { DynamicIcon } from "@/lib/icons";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-7">
      <DynamicIcon name="Quote" aria-hidden className="h-7 w-7 text-primary/30" />
      <p className="mt-3 flex-1 text-base leading-relaxed">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="h-10 w-10 rounded-full bg-muted" aria-hidden />
        <div>
          <div className="text-sm font-semibold">{testimonial.role}</div>
          <div className="text-xs text-muted-foreground">{testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}
