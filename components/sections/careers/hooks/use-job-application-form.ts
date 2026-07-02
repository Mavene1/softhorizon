"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { JobApplicationSchema, type JobApplicationFormValues } from "../schemas";
import { submitJobApplication } from "../actions";

export function useJobApplicationForm(jobTitle: string) {
  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      portfolioUrl: "",
      resumeUrl: "",
      message: "",
      website: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (values: JobApplicationFormValues) => submitJobApplication(values, jobTitle),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success("Application sent! We'll be in touch if it's a fit.");
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
