"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorReportSubmittedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <h1 className="text-2xl font-semibold">Oops! Something went wrong</h1>
      <p className="text-center text-muted-foreground max-w-md">
        We couldn&apos;t display the confirmation page, but don&apos;t worry -
        your error report was still submitted successfully.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
