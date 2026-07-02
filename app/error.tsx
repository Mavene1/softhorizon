"use client";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: Props) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">An unexpected error occurred. Try again, or return home.</p>
      {process.env.NODE_ENV === "development" && (
        <p className="max-w-md font-mono text-sm text-destructive">{error.message}</p>
      )}
      <div className="flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          {/* hard navigate — clears corrupt router state */}
          <a href="/">Go home</a>
        </Button>
      </div>
    </div>
  );
}
