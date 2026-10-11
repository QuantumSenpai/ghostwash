"use client";

import React, { useEffect } from "react";
import { ToastMessage } from "../../lib/types";

export interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
  durationMs?: number;
}

export function Toast({ toast, onDismiss, durationMs = 3000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [toast, onDismiss, durationMs]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-md text-sm transition-all duration-200 ease-out animate-in fade-in slide-in-from-bottom-2"
    >
      {isSuccess && (
        <span
          className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0"
          aria-hidden="true"
        />
      )}
      {isError && (
        <span
          className="w-2 h-2 rounded-full bg-[var(--color-error)] shrink-0"
          aria-hidden="true"
        />
      )}
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="ml-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] rounded-xs"
      >
        ✕
      </button>
    </div>
  );
}
