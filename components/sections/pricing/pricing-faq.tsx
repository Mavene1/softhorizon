import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/common/section-header";

export function PricingFaq() {
  const pricingFaqs = faqs.filter((faq) => faq.category === "pricing").sort((a, b) => a.order - b.order);

  if (pricingFaqs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <SectionHeader overline="FAQ" title="Pricing questions, answered" align="center" />
      <Accordion type="single" collapsible className="mx-auto mt-10 max-w-2xl">
        {pricingFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-base font-semibold">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
