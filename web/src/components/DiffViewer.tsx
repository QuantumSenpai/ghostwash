"use client";

import React, { useState, useMemo } from "react";
import { Tabs } from "./ui/Tabs";
import { Panel } from "./ui/Panel";
import { ChangeUnit } from "../lib/types";

interface DiffViewerProps {
  changes: ChangeUnit[];
}

export function DiffViewer({ changes }: DiffViewerProps) {
  const [mobileTab, setMobileTab] = useState<string>("original");

  const renderedUnits = useMemo(() => {
    return changes.map((change, idx) => {
      const origOps = change.ops.filter((op) => op.op !== "insert");
      const refOps = change.ops.filter((op) => op.op !== "delete");

      return {
        id: idx,
        unitLabel: change.unit || `Section ${idx + 1}`,
        origNodes: origOps.map((op, oIdx) => {
          if (op.op === "equal") return <span key={oIdx}>{op.a}</span>;
          return (
            <span key={oIdx} className="bg-[var(--color-diff-delete-bg)] text-[var(--color-diff-delete)] px-1 rounded-xs inline-block my-0.5">
              <span className="font-mono text-[10px] select-none mr-0.5 font-bold">[-]</span>
              {op.a}
            </span>
          );
        }),
        refNodes: refOps.map((op, rIdx) => {
          if (op.op === "equal") return <span key={rIdx}>{op.a || op.b}</span>;
          return (
            <span key={rIdx} className="bg-[var(--color-diff-insert-bg)] text-[var(--color-diff-insert)] px-1 rounded-xs inline-block my-0.5">
              <span className="font-mono text-[10px] select-none mr-0.5 font-bold">[+]</span>
              {op.b}
            </span>
          );
        }),
      };
    });
  }, [changes]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex md:hidden">
        <Tabs
          tabs={[
            { id: "original", label: "Original" },
            { id: "refined", label: "Refined" },
          ]}
          activeTab={mobileTab}
          onChange={setMobileTab}
        />
      </div>

      <div className="flex flex-col gap-4">
        {renderedUnits.map((u) => (
          <Panel key={u.id} padding="sm" className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-[var(--color-text-secondary)] uppercase">
              {u.unitLabel}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className={`p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)] whitespace-pre-wrap ${mobileTab === "refined" ? "hidden md:block" : "block"}`}>
                <span className="font-mono text-[10px] text-[var(--color-text-secondary)] font-medium block mb-1">Original</span>
                <div>{u.origNodes}</div>
              </div>
              <div className={`p-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] whitespace-pre-wrap ${mobileTab === "original" ? "hidden md:block" : "block"}`}>
                <span className="font-mono text-[10px] text-[var(--color-success)] font-medium block mb-1">Refined</span>
                <div>{u.refNodes}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
