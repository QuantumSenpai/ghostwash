import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

export default function StylePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-[var(--color-ink)]">
          Style Profiles
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Manage and train custom writing style samples.
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
