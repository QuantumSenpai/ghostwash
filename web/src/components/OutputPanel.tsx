"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { PhantomMark } from "./ui/PhantomMark";
import { ProgressBar } from "./ProgressBar";
import { JobStatusResponse, OutFormat } from "../lib/types";
import { getDownloadUrl } from "../lib/api";

interface OutputPanelProps {
  job: JobStatusResponse | null;
  isRunning: boolean;
  progress: number;
  error: string | null;
  onRetry: () => void;
}

export function OutputPanel({
  job,
  isRunning,
  progress,
  error,
  onRetry,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (isRunning) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-80 text-center gap-4">
        <PhantomMark size={32} isProcessing={true} />
        <ProgressBar progress={progress} statusText="Refining your text..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-80 text-center gap-3">
        <PhantomMark size={28} className="text-[var(--color-error)]" />
        <p className="text-sm font-medium text-[var(--color-ink)]">
          We couldn&apos;t refine this text. Your original draft is still here, try again.
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] font-mono max-w-md">{error}</p>
        <Button size="sm" variant="secondary" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  if (!job || job.status !== "done") {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-80 text-center gap-3">
        <PhantomMark size={28} className="text-[var(--color-text-secondary)]" />
        <p className="text-xs text-[var(--color-text-secondary)] max-w-xs leading-relaxed">
          Your refined version will appear here. Paste some text or upload a document to begin.
        </p>
      </div>
    );
  }

  const isTextJob = job.kind === "text" && job.result?.text;
  const refinedText = job.result?.text || job.result?.out || "";
  const wordCount = refinedText.trim() ? refinedText.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--color-border)]">
        <span className="font-mono text-[var(--color-success)] font-medium">
          {isTextJob ? "Your refined draft is ready." : "Your refined file is ready."}
        </span>
        {isTextJob && (
          <span className="font-mono text-[var(--color-text-secondary)]">
            {wordCount} words · {refinedText.length.toLocaleString()} chars
          </span>
        )}
      </div>

      {isTextJob ? (
        <div className="w-full h-72 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink)] leading-relaxed overflow-y-auto whitespace-pre-wrap select-text">
          {refinedText}
        </div>
      ) : (
        <div className="w-full h-72 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-sm font-medium text-[var(--color-ink)]">{job.filename || "Refined document"}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Processed successfully.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {isTextJob && (
            <Button size="sm" variant="secondary" onClick={() => handleCopy(refinedText)} className="h-8">
              {copied ? "Copied to clipboard" : "Copy text"}
            </Button>
          )}
          {isTextJob ? (
            (["txt", "docx", "pdf"] as OutFormat[]).map((fmt) => (
              <a key={fmt} href={getDownloadUrl(job.id, fmt)} download className="no-underline">
                <Button size="sm" variant="ghost" className="h-8 px-2.5 font-mono text-xs uppercase">
                  .{fmt}
                </Button>
              </a>
            ))
          ) : (
            <a href={getDownloadUrl(job.id)} download className="no-underline">
              <Button size="sm" variant="secondary" className="h-8">
                Download file
              </Button>
            </a>
          )}
        </div>

        <Link href={`/result/${job.id}`}>
          <Button size="sm" variant="ghost" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            Review what changed →
          </Button>
        </Link>
      </div>
    </div>
  );
}
