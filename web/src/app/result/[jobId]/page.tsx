import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidJobId } from "../../../lib/site";
import { Button } from "../../../components/ui/Button";

interface ResultPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { jobId } = await params;

  if (!isValidJobId(jobId)) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-[var(--color-ink)]">
          Job Result
        </h1>
        <p className="text-sm font-mono text-[var(--color-text-secondary)]">
          {jobId}
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
