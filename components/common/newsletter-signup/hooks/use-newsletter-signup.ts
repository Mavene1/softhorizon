"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewsletterSchema, type NewsletterValues } from "../schemas";
import { subscribeToNewsletter } from "../actions";

export function useNewsletterSignup() {
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: { email: "", company: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Could not subscribe. Please try again.");
        return;
      }
      toast.success("You're subscribed — watch your inbox.");
      form.reset();
    },
    onError: () => toast.error("Connection error. Please try again."),
  });

  const onSubmit = form.handleSubmit((values) => mutate(values));

  return { form, onSubmit, isPending };
}
