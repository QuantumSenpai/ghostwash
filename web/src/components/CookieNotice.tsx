"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const STORAGE_KEY = "ghostwash_cookie_notice";

export function CookieNotice() {
  const [acknowledged, setAcknowledged] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setAcknowledged(false);
      }
    } catch {
      setAcknowledged(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "acknowledged");
    } catch {}
    setAcknowledged(true);
  };

  if (acknowledged) return null;

  return (
    <aside
      aria-label="Privacy notice"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 p-4 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg flex flex-col gap-3 text-xs text-[var(--color-ink)]"
    >
      <p className="leading-relaxed">
        Ghostwash uses no tracking, cookies, or analytics. Your text stays on the local server and is deleted after processing.
      </p>
      <div className="flex justify-end">
        <Button size="sm" variant="secondary" onClick={handleDismiss}>
          Understood
        </Button>
      </div>
    </aside>
  );
}
