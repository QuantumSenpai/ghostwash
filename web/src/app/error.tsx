"use client";

import React from "react";
import { Button } from "../components/ui/Button";
import { PhantomMark } from "../components/ui/PhantomMark";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-md gap-4">
        <PhantomMark size={36} className="text-[var(--color-error)]" />
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
          Something went wrong
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          We encountered an unexpected problem while processing this page.
        </p>
        <div className="mt-2">
          <Button variant="secondary" size="md" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
