"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { Spinner } from "../../../components/ui/Spinner";
import { ScoreCard } from "../../../components/ScoreCard";
import { FlagList } from "../../../components/FlagList";
import { getDownloadUrl, getJob, subscribeJobEvents } from "../../../lib/api";
import { formatModelLabel, isValidJobId } from "../../../lib/site";
import { JobStatusResponse, OutFormat } from "../../../lib/types";

const DiffViewer = dynamic(
  () => import("../../../components/DiffViewer").then((m) => m.DiffViewer),
  { loading: () => <p className="text-xs text-[var(--color-text-secondary)]">Loading diff comparison...</p> }
);

export default function ResultPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  if (!isValidJobId(jobId)) notFound();

  const [job, setJob] = useState<JobStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getJob(jobId)
      .then((data) => {
        setJob(data);
        setIsLoading(false);
        if (data.status === "queued" || data.status === "running") {
          unsub = subscribeJobEvents(jobId, (ev) => {
            if (ev.status === "done" || ev.status === "error") {
              getJob(jobId).then(setJob).catch(() => {});
            }
          });
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load job");
        setIsLoading(false);
      });
    return () => unsub?.();
  }, [jobId]);

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
        <Spinner size="md" />
        <p className="text-xs text-[var(--color-text-secondary)] font-mono">Loading review...</p>
      </main>
    );
  }

  if (error || !job || job.status === "error") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-4 text-center">
        <p className="text-sm font-medium text-[var(--color-ink)]">Unable to load job result.</p>
        <p className="text-xs text-[var(--color-text-secondary)] font-mono">{error || job?.error}</p>
        <Link href="/studio"><Button variant="secondary" size="sm">Back to Studio</Button></Link>
      </main>
    );
  }

  const result = job.result;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">Review what changed</h1>
          <p className="font-mono text-xs text-[var(--color-text-secondary)] mt-1">{job.id}</p>
          {job.model && (
            <p className="font-mono text-xs text-[var(--color-text-secondary)] mt-1" data-model={job.model}>
              {job.mode === "ml" ? "Rules + ML" : "Rules"} · {formatModelLabel(job.model)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/studio"><Button variant="secondary" size="sm">Back to Studio</Button></Link>
          {job.kind === "text" ? (
            (["txt", "docx", "pdf"] as OutFormat[]).map((fmt) => (
              <a key={fmt} href={getDownloadUrl(job.id, fmt)} download className="no-underline">
                <Button size="sm" variant="ghost" className="h-8 font-mono text-xs uppercase">.{fmt}</Button>
              </a>
            ))
          ) : (
            <a href={getDownloadUrl(job.id)} download className="no-underline">
              <Button size="sm" variant="primary">Download file</Button>
            </a>
          )}
        </div>
      </div>

      {result && (
        <div className="flex flex-col gap-8">
          <ScoreCard result={result} />
          <FlagList flags={result.flags} />
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-[var(--color-ink)]">Detailed Change Comparison</h2>
            <DiffViewer changes={result.changes} />
          </div>
        </div>
      )}
    </main>
  );
}
