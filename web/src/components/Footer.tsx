import React from "react";
import Link from "next/link";
import {
  ALLOWED_EXTERNAL_LINKS,
  CONTACT_EMAIL,
  LAST_UPDATED,
  OPERATOR_NAME,
} from "../lib/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 text-xs text-[var(--color-text-secondary)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-sm">
            <span className="font-semibold text-sm text-[var(--color-ink)]">ghostwash</span>
            <p className="leading-relaxed">
              Cleaner, more natural writing studio. Runs locally or on your own server.
            </p>
            <p className="mt-2 text-[11px]">
              Operated by {OPERATOR_NAME} · Contact: {CONTACT_EMAIL}
            </p>
          </div>

          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-[var(--color-ink)]">Studio</span>
              <Link href="/#studio" className="hover:text-[var(--color-ink)]">Humanizer</Link>
              <Link href="/compare" className="hover:text-[var(--color-ink)]">Compare</Link>
              <Link href="/style" className="hover:text-[var(--color-ink)]">Styles</Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-[var(--color-ink)]">Checks (Third-party)</span>
              <a
                href={ALLOWED_EXTERNAL_LINKS.gptzero}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-ink)]"
              >
                GPTZero (external)
              </a>
              <a
                href={ALLOWED_EXTERNAL_LINKS.zerogpt}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-ink)]"
              >
                ZeroGPT (external)
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-[var(--color-ink)]">Legal & Attribution</span>
              <Link href="/#privacy" className="hover:text-[var(--color-ink)]">Privacy</Link>
              <Link href="/#terms" className="hover:text-[var(--color-ink)]">Terms</Link>
              <span className="text-[11px]">Updated {LAST_UPDATED}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-4 text-[11px] leading-relaxed">
          <p>
            Phrase patterns informed by Wikipedia &quot;Signs of AI writing&quot; (CC BY-SA). Ghostwash is not affiliated with Wikipedia, ElevenLabs, or any detector service.
          </p>
          <p className="shrink-0">No tracking · No third-party AI</p>
        </div>
      </div>
    </footer>
  );
}
