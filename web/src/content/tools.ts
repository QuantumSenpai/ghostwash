import { ALLOWED_EXTERNAL_LINKS } from "../lib/site";

export interface ExternalToolItem {
  name: string;
  url: string;
  description: string;
}

export const EXTERNAL_TOOLS: ExternalToolItem[] = [
  {
    name: "GPTZero",
    url: ALLOWED_EXTERNAL_LINKS.gptzero,
    description: "Third-party text analysis platform measuring perplexity and burstiness metrics.",
  },
  {
    name: "ZeroGPT",
    url: ALLOWED_EXTERNAL_LINKS.zerogpt,
    description: "Independent online detector checking sentence structure and formulaic patterns.",
  },
  {
    name: "Copyleaks",
    url: ALLOWED_EXTERNAL_LINKS.copyleaks,
    description: "Commercial text verification and content authenticity analysis service.",
  },
  {
    name: "Originality.ai",
    url: ALLOWED_EXTERNAL_LINKS.originality,
    description: "Content scanning system used by publishers and editorial teams.",
  },
];

export const TOOL_DISCLAIMERS = [
  "External tools operate using differing statistical models and training corpora.",
  "Results from third-party detectors often disagree with one another and do not provide definitive proof of authorship.",
  "Ghostwash is not affiliated with, sponsored by, or endorsed by any of the services listed above.",
];
