"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhantomMark } from "./ui/PhantomMark";
import { Button } from "./ui/Button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-canvas)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] rounded-xs"
        >
          <PhantomMark size={22} />
          <span className="font-semibold tracking-tight text-base">ghostwash</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <Link href="/studio" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] transition-colors">
            Studio
          </Link>
          <Link href="/compare" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] transition-colors">
            Compare
          </Link>
          <Link href="/style" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] transition-colors">
            Style
          </Link>
          <Link href="/#how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] transition-colors">
            How it works
          </Link>
          <Link href="/faq" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] transition-colors">
            FAQ
          </Link>
          <Link href="/studio">
            <Button variant="primary" size="sm">
              Open Studio
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden h-11 w-11 items-center justify-center rounded-[var(--radius-input)] text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] cursor-pointer"
        >
          <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-4 flex flex-col gap-2"
        >
          <Link href="/studio" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            Studio
          </Link>
          <Link href="/compare" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            Compare
          </Link>
          <Link href="/style" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            Style
          </Link>
          <Link href="/#how-it-works" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            How it works
          </Link>
          <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            FAQ
          </Link>
          <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="flex h-11 items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-ink)]">
            Privacy
          </Link>
          <Link href="/studio" onClick={() => setIsMenuOpen(false)} className="mt-2">
            <Button variant="primary" size="md" className="w-full">
              Open Studio
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
