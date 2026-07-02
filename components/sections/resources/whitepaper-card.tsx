"use client";

import Image from "next/image";
import type { Whitepaper } from "@/content/whitepapers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";
import { useWhitepaperRequestForm } from "./whitepapers/hooks/use-whitepaper-request-form";

export function WhitepaperCard({ whitepaper }: { whitepaper: Whitepaper }) {
  const { form, handleSubmit, isPending } = useWhitepaperRequestForm(whitepaper.title, whitepaper.fileUrl);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={whitepaper.coverImage}
          alt={`${whitepaper.title} cover`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{whitepaper.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{whitepaper.summary}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-5 w-full">
              <DynamicIcon name="Download" aria-hidden className="h-4 w-4" />
              Get the download
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{whitepaper.title}</DialogTitle>
              <DialogDescription>
                Enter your email and we'll send you a link to download this whitepaper.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
                  <label htmlFor={`whitepaper-website-${whitepaper.slug}`}>Website</label>
                  <input
                    id={`whitepaper-website-${whitepaper.slug}`}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...form.register("website")}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="you@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <DynamicIcon name="Loader2" className="h-4 w-4 animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    "Email me the download"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
