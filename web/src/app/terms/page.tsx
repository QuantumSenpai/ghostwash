import React from "react";
import { Metadata } from "next";
import { PageShell } from "../../components/PageShell";
import { TERMS_SECTIONS } from "../../content/terms";
import { LAST_UPDATED } from "../../lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Ghostwash",
  description: "Terms and acceptable use guidelines for the Ghostwash writing studio.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="LEGAL DRAFT"
      title="Terms of Service"
      description="Guidelines for utilizing Ghostwash for writing revision and draft refinement."
      lastUpdated={LAST_UPDATED}
    >
      <div className="flex flex-col gap-8">
        {TERMS_SECTIONS.map((section, idx) => (
          <section key={idx} className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">
              {section.title}
            </h2>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
