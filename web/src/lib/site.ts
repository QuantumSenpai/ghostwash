import type { JobStatusResponse } from "./types";

export const OPERATOR_NAME = "Ghostwash Project";
export const CONTACT_EMAIL = "hello@ghostwash.local";
export const LAST_UPDATED = "October 2026";

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
export const MAX_CHARACTERS = 200000;
export const ALLOWED_EXTENSIONS = [".txt", ".md", ".docx", ".pdf"];

export const JOB_ID_REGEX = /^[a-f0-9]{32}$/;
export const STYLE_NAME_REGEX = /^[\w-]{1,40}$/;

export const ALLOWED_EXTERNAL_LINKS: Record<string, string> = {
  wikipediaSigns: "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing",
  elevenlabsBrand: "https://elevenlabs.io/brand",
  elevenlabsUi: "https://ui.elevenlabs.io",
  gptzero: "https://gptzero.me",
  zerogpt: "https://www.zerogpt.com",
  copyleaks: "https://copyleaks.com",
  originality: "https://originality.ai",
};

export function isAllowedExternalUrl(url: string): boolean {
  if (!url.startsWith("https://")) return false;
  return Object.values(ALLOWED_EXTERNAL_LINKS).includes(url);
}

export function isValidJobId(id: string): boolean {
  return JOB_ID_REGEX.test(id);
}

export function isValidStyleName(name: string): boolean {
  return STYLE_NAME_REGEX.test(name);
}

export function isValidFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "File exceeds 20 MB limit." };
  }
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "Unsupported file type. Use .txt, .md, .docx, or .pdf." };
  }
  return { valid: true };
}

export function isNoOpResult(
  job: JobStatusResponse | null,
  inputText?: string
): boolean {
  if (!job || job.status !== "done" || job.kind !== "text" || !job.result) {
    return false;
  }
  if (job.result.units_changed !== 0) {
    return false;
  }
  const outText = job.result.text || job.result.out || "";
  const input = inputText || "";
  return outText.trim() === input.trim();
}

export const MODEL_LABELS: Record<string, string> = {
  qwen7b: "Qwen2.5 7B",
  qwen3b: "Qwen2.5 3B (faster)",
  llama3b: "Llama 3.2 3B",
};

export function formatModelLabel(model?: string | null): string {
  if (!model) return "";
  return MODEL_LABELS[model] || model;
}

