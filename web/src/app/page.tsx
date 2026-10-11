import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { PhantomMark } from "../components/ui/PhantomMark";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
          A QUIETER WAY TO REFINE WRITING
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[var(--color-ink)] max-w-3xl leading-[1.1] mb-6">
          Make every word feel more like you.
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-8">
          Refine clarity, rhythm, and tone while keeping your meaning intact.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/studio">
            <Button variant="primary" size="lg">
              Open the Studio
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="lg">
              See how it works
            </Button>
          </Link>
        </div>

        <Panel padding="md" className="w-full max-w-2xl text-left shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
            <span className="font-mono text-xs text-[var(--color-text-secondary)]">EDITORIAL TRANSFORMATION</span>
            <PhantomMark size={16} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="p-3 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)]">
              <span className="font-mono text-[10px] text-[var(--color-text-secondary)] block mb-1">ORIGINAL</span>
              <p className="text-[var(--color-text-secondary)] line-through">
                In today&apos;s rapidly evolving digital landscape, it is crucial to delve into the tapestry of human innovation.
              </p>
            </div>
            <div className="p-3 rounded-[var(--radius-input)] bg-[var(--color-diff-insert-bg)]/20 border border-[var(--color-diff-insert)]/20">
              <span className="font-mono text-[10px] text-[var(--color-diff-insert)] font-medium block mb-1">REFINED</span>
              <p className="text-[var(--color-ink)]">
                Today, we need to look closely at how people actually build and create new tools.
              </p>
            </div>
          </div>
        </Panel>
      </section>

      <section id="how-it-works" className="py-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">WORKFLOW</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]">Three intentional steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Panel padding="md">
              <span className="font-mono text-xs text-[var(--color-text-secondary)] block mb-2">01 / PASTE</span>
              <h3 className="text-base font-medium text-[var(--color-ink)] mb-2">Add your draft</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Paste up to 200,000 characters or upload a document (.txt, .md, .docx, .pdf up to 20 MB).
              </p>
            </Panel>
            <Panel padding="md">
              <span className="font-mono text-xs text-[var(--color-text-secondary)] block mb-2">02 / REFINE</span>
              <h3 className="text-base font-medium text-[var(--color-ink)] mb-2">Choose your mode</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Run swift deterministic rules or local neural models running on your machine.
              </p>
            </Panel>
            <Panel padding="md">
              <span className="font-mono text-xs text-[var(--color-text-secondary)] block mb-2">03 / REVIEW</span>
              <h3 className="text-base font-medium text-[var(--color-ink)] mb-2">Inspect & verify</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Compare side-by-side diffs, check style flags, and copy your polished version.
              </p>
            </Panel>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[var(--color-border)] max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">CAPABILITIES</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]">A focused studio toolkit</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel padding="md">
            <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1">Humanizer Studio</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Quiet dual-column workspace built specifically for drafting without distractions.
            </p>
          </Panel>
          <Panel padding="md">
            <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1">Diff Comparison</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Clear visual inspection displaying removed padding and substituted phrasing.
            </p>
          </Panel>
          <Panel padding="md">
            <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1">Transparent Style Flags</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Objective measurements of repetitive patterns informed by curated Wikipedia writing guides.
            </p>
          </Panel>
          <Panel padding="md">
            <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1">External Verification</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Quick access to independent third-party checkers with clear non-affiliation disclosures.
            </p>
          </Panel>
        </div>
      </section>

      <section className="py-20 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">PRIVACY & TRUST</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] mb-6">Designed with strict restraint</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs text-[var(--color-text-secondary)]">
            <div className="p-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <strong className="text-[var(--color-ink)] block mb-1">Zero Third-Party AI</strong>
              All processing executes on your server. No text is ever forwarded to external AI providers.
            </div>
            <div className="p-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <strong className="text-[var(--color-ink)] block mb-1">Automatic Deletion</strong>
              Uploaded files are removed immediately upon completion. Cached outputs purge after 24 hours.
            </div>
            <div className="p-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <strong className="text-[var(--color-ink)] block mb-1">No Accounts or Profiles</strong>
              No accounts, no telemetry, no tracking cookies, and no database storing your identity.
            </div>
            <div className="p-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <strong className="text-[var(--color-ink)] block mb-1">Clear Technical Limits</strong>
              Files up to 20 MB; text up to 200,000 characters. Clean, Latin-compatible output generation.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
