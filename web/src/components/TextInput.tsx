"use client";

import React, { useMemo } from "react";
import { Button } from "./ui/Button";
import { MAX_CHARACTERS } from "../lib/site";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TextInput({
  value,
  onChange,
  disabled = false,
}: TextInputProps) {
  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [value]);

  const charCount = value.length;
  const isOverLimit = charCount > MAX_CHARACTERS;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text.slice(0, MAX_CHARACTERS));
    } catch {}
  };

  const handleClear = () => {
    if (!value) return;
    if (window.confirm("Clear all text from editor?")) {
      onChange("");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-[var(--color-text-secondary)]">
          {wordCount} words · {charCount.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
        </span>
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePaste}
            disabled={disabled}
            className="h-7 px-2 text-xs"
          >
            Paste
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClear}
            disabled={disabled || !value}
            className="h-7 px-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-error)]"
          >
            Clear
          </Button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your draft to get started..."
        className={`w-full h-80 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text-secondary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] disabled:opacity-60 transition-colors duration-150 leading-relaxed resize-none ${
          isOverLimit ? "border-[var(--color-error)]" : ""
        }`}
      />
      {isOverLimit && (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          Text exceeds the 200,000 character limit.
        </p>
      )}
    </div>
  );
}
