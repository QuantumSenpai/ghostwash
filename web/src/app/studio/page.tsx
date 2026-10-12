"use client";

import React, { useState, useEffect, useRef } from "react";
import { Panel } from "../../components/ui/Panel";
import { Tabs } from "../../components/ui/Tabs";
import { TextInput } from "../../components/TextInput";
import { FileDropzone } from "../../components/FileDropzone";
import { ModeToggle } from "../../components/ModeToggle";
import { StudioControls } from "../../components/StudioControls";
import { OutputPanel } from "../../components/OutputPanel";
import { useJobStore } from "../../store/useJobStore";
import { createJob, getHealth, getJob, getStyles, subscribeJobEvents, triggerWarmup } from "../../lib/api";
import { MAX_CHARACTERS } from "../../lib/site";

export default function StudioPage() {
  const store = useJobStore();
  const [inputTab, setInputTab] = useState<string>("paste");
  const [mobileTab, setMobileTab] = useState<string>("original");
  const [stylesList, setStylesList] = useState<string[]>([]);
  const [modelLoaded, setModelLoaded] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    getHealth(ac.signal).then((h) => setModelLoaded(h.model_loaded)).catch(() => {});
    getStyles(ac.signal).then((s) => setStylesList(s.styles)).catch(() => {});
    return () => { ac.abort(); unsubRef.current?.(); };
  }, []);

  useEffect(() => {
    if (store.mode === "ml" && !modelLoaded) triggerWarmup().catch(() => {});
  }, [store.mode, modelLoaded]);

  const handleRefine = async () => {
    if (store.isSubmitting) return;
    store.setError(null);
    store.setIsSubmitting(true);
    setProgress(0);
    try {
      const payload = inputTab === "paste"
        ? { text: store.inputText, mode: store.mode, strength: store.strength, style: store.style }
        : { file: store.selectedFile!, mode: store.mode, strength: store.strength, style: store.style, out_format: store.outFormat };
      const job = await createJob(payload);
      store.setCurrentJobId(job.id);
      unsubRef.current?.();
      unsubRef.current = subscribeJobEvents(job.id, (ev) => {
        setProgress(ev.progress);
        if (ev.status === "done") {
          unsubRef.current?.();
          getJob(job.id)
            .then((res) => { store.setActiveJob(res); store.setIsSubmitting(false); setMobileTab("refined"); })
            .catch((err: unknown) => { store.setError(err instanceof Error ? err.message : "Could not load the result"); store.setIsSubmitting(false); });
        } else if (ev.status === "error") {
          unsubRef.current?.();
          store.setError(ev.error || "Processing failed");
          store.setIsSubmitting(false);
        }
      }, () => {
        getJob(job.id).then((res) => {
          if (res.status === "done") {
            store.setActiveJob(res);
            store.setIsSubmitting(false);
            setMobileTab("refined");
          } else if (res.status === "error") {
            store.setActiveJob(res);
            store.setError(res.error || "Processing failed");
            store.setIsSubmitting(false);
          }
        }).catch((err: unknown) => {
          store.setError(err instanceof Error ? err.message : "Processing failed");
          store.setIsSubmitting(false);
        });
      });
    } catch (err: unknown) {
      store.setError(err instanceof Error ? err.message : "Submission failed");
      store.setIsSubmitting(false);
    }
  };

  const canSubmit = inputTab === "paste"
    ? store.inputText.trim().length > 0 && store.inputText.length <= MAX_CHARACTERS
    : store.selectedFile !== null;

  return (
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">Humanizer Studio</h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">Refine wording without losing your meaning.</p>
      </div>
      <div className="flex md:hidden">
        <Tabs tabs={[{ id: "original", label: "Original text" }, { id: "refined", label: "Refined text" }]} activeTab={mobileTab} onChange={setMobileTab} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className={`flex flex-col gap-4 ${mobileTab === "refined" ? "hidden md:flex" : "flex"}`}>
          <Panel padding="md" className="flex flex-col gap-4 shadow-xs">
            <Tabs tabs={[{ id: "paste", label: "Paste text" }, { id: "file", label: "Upload file" }]} activeTab={inputTab} onChange={(t) => { setInputTab(t); t === "paste" ? store.setSelectedFile(null) : store.setInputText(""); }} />
            {inputTab === "paste" ? <TextInput value={store.inputText} onChange={store.setInputText} disabled={store.isSubmitting} /> : <FileDropzone selectedFile={store.selectedFile} onSelectFile={store.setSelectedFile} disabled={store.isSubmitting} />}
            <ModeToggle mode={store.mode} onModeChange={store.setMode} strength={store.strength} onStrengthChange={store.setStrength} modelLoaded={modelLoaded} disabled={store.isSubmitting} />
            <StudioControls styles={stylesList} selectedStyle={store.style} onStyleChange={store.setStyle} outFormat={store.outFormat} onOutFormatChange={store.setOutFormat} isFileJob={inputTab === "file"} canSubmit={canSubmit} isSubmitting={store.isSubmitting} onSubmit={handleRefine} />
          </Panel>
        </div>
        <div className={`flex flex-col gap-4 ${mobileTab === "original" ? "hidden md:flex" : "flex"}`}>
          <Panel padding="md" className="flex flex-col min-h-[500px] shadow-xs justify-between">
            <OutputPanel
              job={store.activeJob}
              isRunning={store.isSubmitting}
              progress={progress}
              error={store.error}
              inputText={inputTab === "paste" ? store.inputText : undefined}
              onRetry={handleRefine}
            />
          </Panel>
        </div>
      </div>
    </main>
  );
}
