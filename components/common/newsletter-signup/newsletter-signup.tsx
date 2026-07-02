"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useNewsletterSignup } from "./hooks/use-newsletter-signup";

interface NewsletterSignupProps {
  variant?: "default" | "dark";
  className?: string;
}

export function NewsletterSignup({ variant = "default", className }: NewsletterSignupProps) {
  const { form, onSubmit, isPending } = useNewsletterSignup();
  const isDark = variant === "dark";

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        noValidate
        className={cn("flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:items-start", className)}
      >
        <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          <label htmlFor="newsletter-company">Company</label>
          <input id="newsletter-company" type="text" tabIndex={-1} autoComplete="off" {...form.register("company")} />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className={cn(
                    isDark &&
                      "border-white/15 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-white/30 focus-visible:ring-white/20"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className={cn(isDark && "text-red-400")} />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="shrink-0">
          {isPending ? <DynamicIcon name="Loader2" className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
