import React from "react";

interface PageShellProps {
  title: string;
  eyebrow?: string;
  description?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function PageShell({
  title,
  eyebrow,
  description,
  lastUpdated,
  children,
}: PageShellProps) {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)] mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
        {lastUpdated && (
          <p className="font-mono text-xs text-[var(--color-text-secondary)] mt-4">
            Last updated: {lastUpdated}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </main>
  );
}
