"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactSchema, type ContactFormValues } from "../schemas";
import { submitContactForm } from "../actions";

export function useContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      budget: undefined,
      website: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success("Message sent! We'll be in touch within one business day.");
      form.reset();
    },
    onError: () => toast.error("Connection error. Please try again."),
  });

  return {
    form,
    handleSubmit: form.handleSubmit((values) => mutate(values)),
    isPending,
    isSuccess,
  };
}
