import React from "react";
import { Panel } from "./ui/Panel";
import { JobResult } from "../lib/types";

interface ScoreCardProps {
  result: JobResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const diffScore = result.score_before - result.score_after;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Panel padding="sm" className="flex flex-col">
          <span className="font-mono text-[10px] text-[var(--color-text-secondary)] uppercase">
            Initial Flags
          </span>
          <span className="font-mono text-xl font-medium text-[var(--color-ink)] mt-1">
            {result.score_before}
          </span>
        </Panel>

        <Panel padding="sm" className="flex flex-col">
          <span className="font-mono text-[10px] text-[var(--color-text-secondary)] uppercase">
            Refined Flags
          </span>
          <span className="font-mono text-xl font-medium text-[var(--color-success)] mt-1">
            {result.score_after}
            {diffScore > 0 && (
              <span className="text-xs text-[var(--color-success)] font-normal ml-1">
                (-{diffScore})
              </span>
            )}
          </span>
        </Panel>

        <Panel padding="sm" className="flex flex-col">
          <span className="font-mono text-[10px] text-[var(--color-text-secondary)] uppercase">
            Sections Changed
          </span>
          <span className="font-mono text-xl font-medium text-[var(--color-ink)] mt-1">
            {result.units_changed}
          </span>
        </Panel>

        <Panel padding="sm" className="flex flex-col">
          <span className="font-mono text-[10px] text-[var(--color-text-secondary)] uppercase">
            Invisible Removed
          </span>
          <span className="font-mono text-xl font-medium text-[var(--color-ink)] mt-1">
            {result.invisible_removed}
          </span>
        </Panel>
      </div>

      <p className="text-[11px] text-[var(--color-text-secondary)]">
        Style flags represent our own editorial pattern metric and do not reflect external AI detector scores.
      </p>
    </div>
  );
}
