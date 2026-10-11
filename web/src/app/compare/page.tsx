"use client";

import React, { useState, useRef, useEffect } from "react";
import { Panel } from "../../components/ui/Panel";
import { Button } from "../../components/ui/Button";
import { TextInput } from "../../components/TextInput";
import { Segmented } from "../../components/ui/Segmented";
import { ProgressBar } from "../../components/ProgressBar";
import { ScoreCard } from "../../components/ScoreCard";
import { createJob, getJob, subscribeJobEvents } from "../../lib/api";
import { JobStatusResponse, Strength } from "../../lib/types";

export default function ComparePage() {
  const [text, setText] = useState("");
  const [strength, setStrength] = useState<Strength>("light");
  const [isRunning, setIsRunning] = useState(false);
  const [mlProgress, setMlProgress] = useState(0);
  const [rulesJob, setRulesJob] = useState<JobStatusResponse | null>(null);
  const [mlJob, setMlJob] = useState<JobStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => () => unsubRef.current?.(), []);

  const handleCompare = async () => {
    if (!text.trim() || isRunning) return;
    setIsRunning(true);
    setError(null);
    setMlProgress(0);
    setRulesJob(null);
    setMlJob(null);

    try {
      const [rJob, mJob] = await Promise.all([
        createJob({ text, mode: "rules", strength }),
        createJob({ text, mode: "ml", strength }),
      ]);
      getJob(rJob.id).then(setRulesJob).catch(() => {});
      unsubRef.current = subscribeJobEvents(mJob.id, (ev) => {
        setMlProgress(ev.progress);
        if (ev.status === "done" || ev.status === "error") {
          getJob(mJob.id).then((j) => { setMlJob(j); setIsRunning(false); });
        }
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Comparison failed");
      setIsRunning(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">Side-by-Side Comparison</h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">Run deterministic Rules alongside neural ML refinement on the exact same draft.</p>
      </div>

      <Panel padding="md" className="flex flex-col gap-4">
        <TextInput value={text} onChange={setText} disabled={isRunning} />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--color-border)]">
          <Segmented<Strength>
            label="ML Strength"
            value={strength}
            onChange={setStrength}
            options={[{ label: "Light", value: "light" }, { label: "Heavy", value: "heavy" }]}
          />
          <Button variant="primary" size="md" isLoading={isRunning} disabled={!text.trim() || isRunning} onClick={handleCompare}>
            Compare Modes
          </Button>
        </div>
        {error && <p className="text-xs text-[var(--color-error)]" role="alert">{error}</p>}
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Panel padding="md" className="flex flex-col gap-4 min-h-[360px]">
          <span className="font-mono text-xs text-[var(--color-text-secondary)] uppercase">RULES REFINEMENT</span>
          {rulesJob?.result ? (
            <div className="flex flex-col gap-4">
              <ScoreCard result={rulesJob.result} />
              <div className="p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)] text-xs leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                {rulesJob.result.out}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-text-secondary)] italic my-auto text-center">Rules output will appear here instantly.</p>
          )}
        </Panel>

        <Panel padding="md" className="flex flex-col gap-4 min-h-[360px]">
          <span className="font-mono text-xs text-[var(--color-text-secondary)] uppercase">RULES + ML REFINEMENT</span>
          {isRunning && !mlJob ? (
            <div className="my-auto"><ProgressBar progress={mlProgress} statusText="Running neural model..." /></div>
          ) : mlJob?.result ? (
            <div className="flex flex-col gap-4">
              <ScoreCard result={mlJob.result} />
              <div className="p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)] text-xs leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                {mlJob.result.out}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-text-secondary)] italic my-auto text-center">ML output will appear here once processed.</p>
          )}
        </Panel>
      </div>
    </main>
  );
}
