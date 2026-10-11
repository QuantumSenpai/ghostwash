import React from "react";

type PanelPadding = "none" | "sm" | "md" | "lg";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: PanelPadding;
  muted?: boolean;
}

const paddingStyles: Record<PanelPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Panel({
  children,
  padding = "md",
  muted = false,
  className = "",
  ...props
}: PanelProps) {
  const bgClass = muted
    ? "bg-[var(--color-surface-muted)]"
    : "bg-[var(--color-surface)]";

  return (
    <div
      className={`rounded-[var(--radius-panel)] border border-[var(--color-border)] ${bgClass} ${paddingStyles[padding]} transition-colors duration-150 ease-out ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
