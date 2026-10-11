import React from "react";
import { Metadata } from "next";
import { PageShell } from "../../components/PageShell";
import { PRIVACY_SECTIONS } from "../../content/privacy";
import { CONTACT_EMAIL, LAST_UPDATED, OPERATOR_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Ghostwash",
  description: "Learn how Ghostwash handles your drafts, file uploads, and browser data.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="LEGAL DRAFT"
      title="Privacy Policy"
      description="We believe writing tools should respect your privacy by default, without telemetry or cloud tracking."
      lastUpdated={LAST_UPDATED}
    >
      <div className="flex flex-col gap-8">
        {PRIVACY_SECTIONS.map((section, idx) => (
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

        <section className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-2 text-xs text-[var(--color-text-secondary)]">
          <h2 className="text-sm font-semibold text-[var(--color-ink)]">Contact Information</h2>
          <p>
            Operated by <strong className="text-[var(--color-ink)]">{OPERATOR_NAME}</strong>. For inquiries or questions, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-ink)] underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
