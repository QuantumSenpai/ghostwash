import React from "react";

interface PhantomMarkProps {
  size?: number;
  isProcessing?: boolean;
  className?: string;
}

export function PhantomMark({
  size = 20,
  isProcessing = false,
  className = "",
}: PhantomMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M5 11C5 7.13401 8.13401 4 12 4C15.866 4 19 7.13401 19 11V20L16 18L13.5 20L10.5 18L8 20L5 18V11Z"
        fill="currentColor"
      />
      <rect x="8.5" y="9.5" width="2" height="2" fill="var(--color-canvas)" />
      <rect x="13.5" y="9.5" width="2" height="2" fill="var(--color-canvas)" />
      <rect
        x="18"
        y="4"
        width="3"
        height="3"
        fill="var(--color-accent)"
        className={isProcessing ? "animate-pixel-a" : ""}
      />
      {isProcessing && (
        <rect
          x="3"
          y="6"
          width="2.5"
          height="2.5"
          fill="var(--color-accent)"
          className="animate-pixel-b"
        />
      )}
    </svg>
  );
}
