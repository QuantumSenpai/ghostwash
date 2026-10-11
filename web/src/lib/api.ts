import {
  HealthResponse,
  JobOut,
  JobStatusResponse,
  Mode,
  OutFormat,
  SSEEvent,
  StylesResponse,
  Strength,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status === 413) throw new Error("The uploaded content exceeds the size limit.");
    if (res.status === 415) throw new Error("Unsupported file format.");
    if (res.status === 422) throw new Error("Invalid input or parameters.");
    if (res.status === 404) throw new Error("Requested resource was not found.");
    const body = await res.text().catch(() => "");
    throw new Error(body || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function createJob(params: {
  file?: File;
  text?: string;
  mode: Mode;
  strength: Strength;
  style?: string;
  out_format?: OutFormat;
}, signal?: AbortSignal): Promise<JobOut> {
  const formData = new FormData();
  if (params.file) {
    formData.append("file", params.file);
  } else if (params.text !== undefined) {
    formData.append("text", params.text);
  }
  formData.append("mode", params.mode);
  formData.append("strength", params.strength);
  if (params.style) formData.append("style", params.style);
  if (params.out_format) formData.append("out_format", params.out_format);

  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    body: formData,
    signal,
  });
  return handleResponse<JobOut>(res);
}

export async function getJob(id: string, signal?: AbortSignal): Promise<JobStatusResponse> {
  const res = await fetch(`${BASE_URL}/api/jobs/${encodeURIComponent(id)}`, { signal });
  return handleResponse<JobStatusResponse>(res);
}

export function subscribeJobEvents(
  id: string,
  onEvent: (event: SSEEvent) => void,
  onError?: (err: Event) => void
): () => void {
  const es = new EventSource(`${BASE_URL}/api/jobs/${encodeURIComponent(id)}/events`);
  es.onmessage = (msg) => {
    try {
      const data: SSEEvent = JSON.parse(msg.data);
      onEvent(data);
      if (data.status === "done" || data.status === "error") {
        es.close();
      }
    } catch {}
  };
  es.onerror = (e) => {
    es.close();
    if (onError) onError(e);
  };
  return () => es.close();
}

export function getDownloadUrl(id: string, format?: OutFormat): string {
  const url = new URL(`${BASE_URL}/api/jobs/${encodeURIComponent(id)}/download`);
  if (format && format !== "same") {
    url.searchParams.set("format", format);
  }
  return url.toString();
}

export async function getStyles(signal?: AbortSignal): Promise<StylesResponse> {
  const res = await fetch(`${BASE_URL}/api/styles`, { signal });
  return handleResponse<StylesResponse>(res);
}

export async function createStyle(
  name: string,
  text: string,
  signal?: AbortSignal
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE_URL}/api/style`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, text }),
    signal,
  });
  return handleResponse<{ ok: boolean }>(res);
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(`${BASE_URL}/api/health`, { signal });
  return handleResponse<HealthResponse>(res);
}

export async function triggerWarmup(signal?: AbortSignal): Promise<{ status: string }> {
  const res = await fetch(`${BASE_URL}/api/warmup`, { method: "POST", signal });
  return handleResponse<{ status: string }>(res);
}
