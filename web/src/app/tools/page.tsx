import React from "react";
import { Metadata } from "next";
import { PageShell } from "../../components/PageShell";
import { Panel } from "../../components/ui/Panel";
import { EXTERNAL_TOOLS, TOOL_DISCLAIMERS } from "../../content/tools";

export const metadata: Metadata = {
  title: "External Checks & Tools — Ghostwash",
  description: "Independent third-party verification platforms and detector references.",
};

export default function ToolsPage() {
  return (
    <PageShell
      eyebrow="THIRD-PARTY SERVICES"
      title="External Verification"
      description="Independent text analysis tools you can use to evaluate your writing. Ghostwash has no affiliation with these providers."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXTERNAL_TOOLS.map((tool) => (
            <Panel key={tool.name} padding="md" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-[var(--color-ink)]">{tool.name}</h2>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]">
                    Third-party
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[var(--color-ink)] hover:underline inline-flex items-center gap-1"
              >
                Visit {tool.name} (external) →
              </a>
            </Panel>
          ))}
        </div>

        <Panel padding="md" muted className="mt-4">
          <h3 className="text-xs font-semibold text-[var(--color-ink)] uppercase tracking-wider mb-2">
            Important Disclaimers
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {TOOL_DISCLAIMERS.map((disc, idx) => (
              <li key={idx}>{disc}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}
