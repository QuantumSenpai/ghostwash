import React from "react";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-ink-dark)] font-medium shadow-xs border-transparent",
  secondary:
    "bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] text-[var(--color-ink)] border border-[var(--color-border)] font-normal",
  ghost:
    "bg-transparent hover:bg-[var(--color-surface-muted)] text-[var(--color-ink)] border-transparent font-normal",
  destructive:
    "bg-[var(--color-error-bg)] hover:opacity-90 text-[var(--color-error)] border border-[var(--color-error)] font-normal",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      isLoading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center rounded-[var(--radius-input)] transition-all duration-150 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <Spinner
            size={size === "lg" ? "md" : "sm"}
            className={variant === "primary" ? "text-[var(--color-ink-dark)]" : ""}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
