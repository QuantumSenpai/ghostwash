export interface PolicySection {
  title: string;
  content: string[];
}

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: "How your text is handled",
    content: [
      "Text and uploaded files are sent directly to the Ghostwash server for processing.",
      "Analysis and rewrites are performed entirely on the local server using deterministic rule engines and an optional locally hosted language model.",
      "Your drafts are never shared with or sent to any third-party AI services, data brokers, or advertising networks.",
    ],
  },
  {
    title: "Cookies and browser storage",
    content: [
      "Ghostwash uses no tracking cookies, analytics scripts, or advertising beacons.",
      "The browser stores only your acknowledgement of the privacy notice in local storage.",
      "Your drafts, filenames, and results are never stored in browser local storage or session storage.",
    ],
  },
  {
    title: "Data retention",
    content: [
      "Uploaded files are deleted immediately after processing finishes.",
      "Job results and generated files are retained in temporary server memory or cache for up to 24 hours, after which they are deleted.",
      "Restarting the Ghostwash server clears all active and cached jobs immediately.",
      "Custom style samples are stored on the server filesystem until the server operator removes them manually.",
    ],
  },
  {
    title: "Third-party services",
    content: [
      "Links to external detection tools and documentation are provided solely for user reference.",
      "Ghostwash has no affiliation with any external detector or service provider.",
    ],
  },
  {
    title: "Children's privacy",
    content: [
      "Ghostwash does not collect personal information from any user, including children under 13.",
    ],
  },
  {
    title: "Policy updates",
    content: [
      "This policy may be revised over time. The 'Last updated' date at the top indicates the latest draft version.",
    ],
  },
];
