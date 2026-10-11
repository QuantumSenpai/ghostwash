"use client";

import React from "react";

interface ProgressBarProps {
  progress: number;
  statusText?: string;
}

export function ProgressBar({
  progress,
  statusText = "Refining your text...",
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percent = Math.round(clampedProgress * 100);

  return (
    <div className="flex flex-col gap-2 w-full py-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[var(--color-ink)]">{statusText}</span>
        {clampedProgress > 0 && (
          <span className="font-mono text-[var(--color-text-secondary)]">{percent}%</span>
        )}
      </div>
      <div className="h-1.5 w-full bg-[var(--color-surface-muted)] rounded-full overflow-hidden border border-[var(--color-border)]">
        <div
          className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
          style={{ width: clampedProgress > 0 ? `${percent}%` : "15%" }}
        />
      </div>
    </div>
  );
}
