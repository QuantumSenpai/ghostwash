import React from "react";
import { Button } from "./Button";

export type StatusMessageType = "info" | "success" | "warning" | "error";

export interface StatusMessageProps {
  type?: StatusMessageType;
  message: string;
  onRetry?: () => void;
  className?: string;
}

const typeStyles: Record<StatusMessageType, { container: string; text: string }> = {
  info: {
    container: "bg-[var(--color-surface-muted)] border-[var(--color-border)]",
    text: "text-[var(--color-ink)]",
  },
  success: {
    container: "bg-[var(--color-success-bg)] border-[var(--color-success)]/30",
    text: "text-[var(--color-success)]",
  },
  warning: {
    container: "bg-[var(--color-warning-bg)] border-[var(--color-warning)]/30",
    text: "text-[var(--color-warning)]",
  },
  error: {
    container: "bg-[var(--color-error-bg)] border-[var(--color-error)]/30",
    text: "text-[var(--color-error)]",
  },
};

export function StatusMessage({
  type = "info",
  message,
  onRetry,
  className = "",
}: StatusMessageProps) {
  const styles = typeStyles[type];

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[var(--radius-input)] border text-xs leading-normal transition-colors duration-150 ease-out ${styles.container} ${styles.text} ${className}`}
    >
      <span className="flex-1">{message}</span>
      {onRetry && (
        <Button
          size="sm"
          variant="secondary"
          onClick={onRetry}
          className="text-xs h-7 px-2.5"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
