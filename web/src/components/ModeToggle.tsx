"use client";

import React from "react";
import { Segmented } from "./ui/Segmented";
import { Select } from "./ui/Select";
import { Mode, ModelInfo, Scope, Strength } from "../lib/types";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  strength: Strength;
  onStrengthChange: (strength: Strength) => void;
  scope?: Scope;
  onScopeChange?: (scope: Scope) => void;
  modelLoaded: boolean;
  model?: string;
  onModelChange?: (model: string) => void;
  models?: ModelInfo[];
  disabled?: boolean;
}

export function ModeToggle({
  mode,
  onModeChange,
  strength,
  onStrengthChange,
  scope = "flagged",
  onScopeChange,
  modelLoaded,
  model = "",
  onModelChange,
  models = [],
  disabled = false,
}: ModeToggleProps) {
  const defaultModel = models.find((m) => m.default) || models[0];
  const selectedModel = model || defaultModel?.key || "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <Segmented<Mode>
          label="Mode"
          value={mode}
          onChange={onModeChange}
          options={[
            { label: "Rules", value: "rules" },
            { label: "Rules + ML", value: "ml" },
          ]}
        />

        {mode === "ml" && (
          <Segmented<Strength>
            label="Strength"
            value={strength}
            onChange={onStrengthChange}
            options={[
              { label: "Light", value: "light" },
              { label: "Heavy", value: "heavy" },
            ]}
          />
        )}
      </div>

      {mode === "ml" && models.length > 0 && onModelChange && (
        <Select
          id="model-select"
          label="Model"
          value={selectedModel}
          onChange={onModelChange}
          disabled={disabled}
          options={models.map((m) => ({
            value: m.key,
            label: m.installed ? m.label : `${m.label} (not installed)`,
            disabled: !m.installed,
          }))}
        />
      )}

      {mode === "ml" && onScopeChange && (
        <div className="flex flex-col gap-1.5">
          <Segmented<Scope>
            label="Scope"
            value={scope}
            onChange={onScopeChange}
            options={[
              { label: "Flagged only", value: "flagged" },
              { label: "Full rewrite", value: "all" },
            ]}
          />
          {scope === "all" && (
            <p className="text-xs text-[var(--color-text-secondary)]">
              Rewrites every paragraph for clarity. Check the result against your original: meaning, names and numbers must still be right.
            </p>
          )}
        </div>
      )}

      {mode === "ml" && !modelLoaded && (
        <p className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] p-2.5 rounded-[var(--radius-input)] border border-[var(--color-warning)]/30">
          The model loads on first use and can take about 30 seconds.
        </p>
      )}
    </div>
  );
}
