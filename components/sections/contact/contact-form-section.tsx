"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DynamicIcon } from "@/lib/icons";
import { SectionHeader } from "@/components/common/section-header";
import { budgetOptions } from "./schemas";
import { useContactForm } from "./hooks/use-contact-form";

export function ContactFormSection() {
  const { form, handleSubmit, isPending } = useContactForm();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader
        overline="Get in touch"
        title="Tell us about your project"
        subtitle="Share a few details and we'll get back to you within one business day."
      />
      <div className="mt-10 max-w-2xl">
        <Form {...form}>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What are you working on?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your project, timeline, and goals..." rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <DynamicIcon name="Loader2" className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
