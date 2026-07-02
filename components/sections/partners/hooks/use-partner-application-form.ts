"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PartnerApplicationSchema, type PartnerApplicationFormValues } from "../schemas";
import { submitPartnerApplication } from "../actions";

export function usePartnerApplicationForm() {
  const form = useForm<PartnerApplicationFormValues>({
    resolver: zodResolver(PartnerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      partnerType: undefined,
      message: "",
      website: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitPartnerApplication,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success("Application sent! We'll be in touch within one business day.");
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
