"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/Button";
import { MAX_FILE_SIZE_BYTES } from "../lib/site";

interface FileDropzoneProps {
  selectedFile: File | null;
  onSelectFile: (file: File | null) => void;
  disabled?: boolean;
}

export function FileDropzone({
  selectedFile,
  onSelectFile,
  disabled = false,
}: FileDropzoneProps) {
  const [rejectError, setRejectError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: false,
    accept: {
      "text/plain": [".txt"],
      "text/markdown": [".md"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/pdf": [".pdf"],
    },
    onDropAccepted: (files) => {
      setRejectError(null);
      if (files[0]) onSelectFile(files[0]);
    },
    onDropRejected: (rejections) => {
      const err = rejections[0]?.errors[0];
      if (err?.code === "file-too-large") {
        setRejectError("File exceeds 20 MB limit.");
      } else {
        setRejectError("Unsupported file type. Use .txt, .md, .docx, or .pdf.");
      }
    },
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (selectedFile) {
    return (
      <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-xs">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[var(--color-ink)] truncate max-w-[240px]">
            {selectedFile.name}
          </span>
          <span className="font-mono text-[var(--color-text-secondary)]">
            {formatSize(selectedFile.size)}
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSelectFile(null)}
            disabled={disabled}
            className="text-xs h-7 px-2"
          >
            Remove file
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-8 rounded-[var(--radius-input)] border border-dashed transition-colors duration-150 cursor-pointer text-center ${
          isDragActive
            ? "border-[var(--color-accent)] bg-[var(--color-surface-muted)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <p className="text-sm font-medium text-[var(--color-ink)] mb-1">
          Drop your document here, or browse
        </p>
        <p className="font-mono text-xs text-[var(--color-text-secondary)]">
          .txt, .md, .docx, .pdf up to 20 MB
        </p>
      </div>
      {rejectError && (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {rejectError}
        </p>
      )}
    </div>
  );
}
