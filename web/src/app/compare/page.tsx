import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

export default function ComparePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-[var(--color-ink)]">
          Diff Comparison
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Compare draft changes and inspect detailed edits side by side.
        </p>
        <Link href="/" className="mt-2">
          <Button variant="secondary" size="sm">
            Back to Studio
          </Button>
        </Link>
      </div>
    </main>
  );
}
