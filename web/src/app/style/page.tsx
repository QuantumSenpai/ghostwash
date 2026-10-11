"use client";

import React, { useState, useEffect } from "react";
import { Panel } from "../../components/ui/Panel";
import { Button } from "../../components/ui/Button";
import { TextArea } from "../../components/ui/TextArea";
import { createStyle, getStyles } from "../../lib/api";
import { isValidStyleName } from "../../lib/site";

export default function StylePage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const fetchStyles = () => getStyles().then((res) => setStyles(res.styles)).catch(() => {});
  useEffect(() => { fetchStyles(); }, []);

  const isValidName = isValidStyleName(name);
  const charCount = text.length;
  const isValidLength = charCount >= 200 && charCount <= 20000;
  const canSave = isValidName && isValidLength && !isSaving;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setIsSaving(true);
    setMessage(null);
    try {
      await createStyle(name, text);
      setMessage({ text: `Style profile "${name}" saved successfully.` });
      setName("");
      setText("");
      fetchStyles();
    } catch (err: unknown) {
      setMessage({ text: err instanceof Error ? err.message : "Failed to save style", error: true });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">Custom Writing Styles</h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">Train custom stylistic guidelines by supplying representative writing samples.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <form onSubmit={handleSave} className="md:col-span-2 flex flex-col gap-4">
          <Panel padding="md" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="style-name" className="text-xs font-medium text-[var(--color-text-secondary)]">Profile Name</label>
              <input
                id="style-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. academic-essay, technical-docs"
                className={`h-10 px-3.5 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] ${name && !isValidName ? "border-[var(--color-error)]" : ""}`}
              />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Alphanumeric and hyphens only (1-40 characters).</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--color-text-secondary)]">Sample Text</span>
                <span className="font-mono text-[var(--color-text-secondary)]">{charCount.toLocaleString()} / 20,000</span>
              </div>
              <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste between 200 and 20,000 characters of representative writing..."
                className="min-h-[180px]"
              />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Requires 200 to 20,000 characters for profile extraction.</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
              <Button type="submit" variant="primary" size="md" isLoading={isSaving} disabled={!canSave}>Save Style Profile</Button>
            </div>
            {message && <p className={`text-xs ${message.error ? "text-[var(--color-error)]" : "text-[var(--color-success)]"}`} role="alert">{message.text}</p>}
          </Panel>
        </form>

        <div className="flex flex-col gap-4">
          <Panel padding="md" className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold text-[var(--color-ink)] uppercase tracking-wider">Saved Profiles</h2>
            {styles.length === 0 ? (
              <p className="text-xs text-[var(--color-text-secondary)] italic">No custom styles recorded yet.</p>
            ) : (
              <ul className="flex flex-col gap-1.5 text-xs">
                {styles.map((s) => (
                  <li key={s} className="p-2 rounded-[var(--radius-input)] bg-[var(--color-surface-muted)] font-mono text-[var(--color-ink)]">{s}</li>
                ))}
              </ul>
            )}
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed pt-2 border-t border-[var(--color-border)]">
              Saved samples remain on the server until the server administrator removes them manually from disk. There is no automated delete button.
            </p>
          </Panel>
        </div>
      </div>
    </main>
  );
}
