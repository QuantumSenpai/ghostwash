import React from "react";

export interface SegmentedOption<T extends string = string> {
  label: string;
  value: T;
}

export interface SegmentedProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  label?: string;
}

export function Segmented<T extends string = string>({
  options,
  value,
  onChange,
  className = "",
  label,
}: SegmentedProps<T>) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          {label}
        </span>
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className="inline-flex p-1 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] select-none"
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex-1 min-h-[36px] px-3.5 py-1.5 text-xs font-medium rounded-[calc(var(--radius-input)-4px)] transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] ${
                isSelected
                  ? "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
