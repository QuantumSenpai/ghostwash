import React from "react";
import { Metadata } from "next";
import { PageShell } from "../../components/PageShell";
import { FAQ_ITEMS } from "../../content/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Ghostwash",
  description: "Honest answers regarding how Ghostwash refines writing, privacy, and limits.",
};

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="HELP & CLARITY"
      title="Frequently Asked Questions"
      description="Direct answers on how text is processed, privacy practices, and technical limits."
    >
      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={index}
            className="group rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors duration-150 ease-out"
          >
            <summary className="cursor-pointer font-medium text-sm text-[var(--color-ink)] flex items-center justify-between gap-4 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] rounded-xs">
              <span>{item.question}</span>
              <span className="font-mono text-xs text-[var(--color-text-secondary)] transition-transform duration-150 ease-out group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
