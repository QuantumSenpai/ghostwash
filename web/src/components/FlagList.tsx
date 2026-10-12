import React from "react";
import { Panel } from "./ui/Panel";
import { Flags } from "../lib/types";

interface FlagListProps {
  flags: Flags;
}

export function FlagList({ flags }: FlagListProps) {
  const beforeFlags = flags.before || [];
  const afterFlags = flags.after || [];

  return (
    <Panel padding="md" className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-ink)]">
          Flagged Phrase Patterns
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
          Style flags identify formulaic transitions, clichéd padding, and repetitive phrase structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-2 p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)]">
          <span className="font-mono text-[11px] text-[var(--color-text-secondary)] font-medium">
            BEFORE ({beforeFlags.length})
          </span>
          {beforeFlags.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] italic">No flagged phrases.</p>
          ) : (
            <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {beforeFlags.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-[var(--color-ink)] truncate">{item.text}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] shrink-0">
                    ×{item.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2 p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)]">
          <span className="font-mono text-[11px] text-[var(--color-text-secondary)] font-medium">
            AFTER ({afterFlags.length})
          </span>
          {afterFlags.length === 0 ? (
            <p className={beforeFlags.length === 0 ? "text-[var(--color-text-secondary)] italic" : "text-[var(--color-success)]"}>
              {beforeFlags.length === 0 ? "No flagged phrases." : "All identified phrase flags resolved."}
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {afterFlags.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-[var(--color-ink)] truncate">{item.text}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] shrink-0">
                    ×{item.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Panel>
  );
}
