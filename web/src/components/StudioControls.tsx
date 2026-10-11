"use client";

import React from "react";
import { Button } from "./ui/Button";
import { OutFormat } from "../lib/types";

interface StudioControlsProps {
  styles: string[];
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  outFormat: OutFormat;
  onOutFormatChange: (format: OutFormat) => void;
  isFileJob: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function StudioControls({
  styles,
  selectedStyle,
  onStyleChange,
  outFormat,
  onOutFormatChange,
  isFileJob,
  canSubmit,
  isSubmitting,
  onSubmit,
}: StudioControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
      <div className="flex flex-wrap items-center gap-3">
        {styles.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="style-select" className="text-[var(--color-text-secondary)] font-medium">
              Style:
            </label>
            <select
              id="style-select"
              value={selectedStyle}
              onChange={(e) => onStyleChange(e.target.value)}
              disabled={isSubmitting}
              className="h-9 px-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              <option value="">Default style</option>
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFileJob && (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="format-select" className="text-[var(--color-text-secondary)] font-medium">
              Output:
            </label>
            <select
              id="format-select"
              value={outFormat}
              onChange={(e) => onOutFormatChange(e.target.value as OutFormat)}
              disabled={isSubmitting}
              className="h-9 px-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] font-mono"
            >
              <option value="same">Same format</option>
              <option value="txt">.txt</option>
              <option value="docx">.docx</option>
              <option value="pdf">.pdf</option>
            </select>
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        disabled={!canSubmit || isSubmitting}
        onClick={onSubmit}
        className="min-w-[130px]"
      >
        Refine text
      </Button>
    </div>
  );
}
