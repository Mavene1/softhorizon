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
import { DynamicIcon } from "@/lib/icons";
import type { JobListing } from "@/content/careers";
import { useJobApplicationForm } from "./hooks/use-job-application-form";

export function ApplicationFormSection({ job }: { job: JobListing }) {
  const { form, handleSubmit, isPending } = useJobApplicationForm(job.title);

  return (
    <section id="apply" className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-semibold tracking-tight">Apply for {job.title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Tell us a bit about yourself and share a link to your resume — we'll get back to you within one business
          day.
        </p>

        <Form {...form}>
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
            <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
              <label htmlFor="application-website">Website</label>
              <input
                id="application-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("website")}
              />
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
                      <Input type="email" placeholder="jane@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="resumeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to resume</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio or LinkedIn (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
                  <FormLabel>Why this role?</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="A few sentences about you and why you'd be a good fit..." {...field} />
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
                "Submit application"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
