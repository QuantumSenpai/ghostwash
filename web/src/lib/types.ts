export type Mode = "rules" | "ml";
export type Strength = "light" | "heavy";
export type Scope = "flagged" | "all";
export type JobKind = "file" | "text";
export type JobStatus = "queued" | "running" | "done" | "error";
export type OutFormat = "same" | "txt" | "docx" | "pdf";

export type FlagItem = {
  text: string;
  weight: number;
  count: number;
};

export type Flags = {
  before: FlagItem[];
  after: FlagItem[];
};

export type DiffOpType = "equal" | "replace" | "delete" | "insert";

export type DiffOp = {
  op: DiffOpType;
  a: string;
  b: string;
};

export type ChangeUnit = {
  unit: string;
  ops: DiffOp[];
};

export type JobResult = {
  out: string;
  invisible_removed: number;
  score_before: number;
  score_after: number;
  units_changed: number;
  flags: Flags;
  changes: ChangeUnit[];
  text?: string;
};

export type JobOut = {
  id: string;
};

export type ModelInfo = {
  key: string;
  label: string;
  installed: boolean;
  loaded: boolean;
  default: boolean;
};

export type JobStatusResponse = {
  id: string;
  status: JobStatus;
  mode: Mode;
  kind: JobKind;
  filename: string | null;
  progress: number;
  result: JobResult | null;
  error: string | null;
  model?: string | null;
};

export type SSEEvent = {
  status: JobStatus;
  progress: number;
  error: string | null;
};

export type WarmupState = "idle" | "warming" | "ready" | "error";

export type HealthResponse = {
  status: string;
  backend: string;
  model: string;
  model_key?: string | null;
  model_loaded: boolean;
  warmup: WarmupState;
  warmup_error: string | null;
};

export type StylesResponse = {
  styles: string[];
};

export type ToastMessage = {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
};
