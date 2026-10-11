export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What does Ghostwash do?",
    answer: "Ghostwash refines text for clarity, rhythm, and natural tone using a deterministic rule engine and an optional local language model running on the host machine.",
  },
  {
    question: "Is my text stored or logged?",
    answer: "Uploaded files are deleted as soon as processing finishes. Generated results are retained for up to 24 hours and then deleted. Restarting the server clears all jobs. The browser never stores your text.",
  },
  {
    question: "Which file formats are supported?",
    answer: "Supported formats are .txt, .md, .docx, and .pdf. Scanned PDFs without text layers are not supported. PDF generation is Latin text only.",
  },
  {
    question: "What are the input limits?",
    answer: "Files are limited to 20 MB. Pasted text is limited to 200,000 characters per job.",
  },
  {
    question: "Does it work in languages other than English?",
    answer: "The phrase patterns and style flag rules are English-focused. Text in other languages can still be processed, but flag detection is tailored to English.",
  },
  {
    question: "Is the output always accurate?",
    answer: "All rewrites are suggestions. You must always review meaning, nuance, and factual accuracy before using the refined text. Results can differ from any external checker.",
  },
  {
    question: "Why style flags instead of an AI detector score?",
    answer: "Style flags measure specific recurring formulas, transition crutches, and repetitive phrases from our rule set. We do not offer or claim AI detector metrics or external scores.",
  },
  {
    question: "Do I need an account to use Ghostwash?",
    answer: "No. Ghostwash requires no registration, no database, no advertising, and no analytics.",
  },
  {
    question: "How does Rules mode differ from Rules + ML?",
    answer: "Rules mode applies deterministic phrase adjustments and removes invisible formatting characters. Rules + ML adds local neural rewriting running on the same machine.",
  },
  {
    question: "Why is the first ML run slower?",
    answer: "The local language model weights must be loaded into memory on initial startup. Subsequent runs process without reload latency.",
  },
  {
    question: "Does Ghostwash send text to third-party AI APIs?",
    answer: "No. All rule evaluation and model inferences happen entirely on the local Ghostwash server. Nothing is transmitted to external AI providers.",
  },
  {
    question: "How are custom style samples handled?",
    answer: "Saved style samples are stored on the server until the server operator manually removes them. There is no automated in-app deletion button for saved styles.",
  },
];
