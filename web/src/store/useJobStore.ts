import { create } from "zustand";
import {
  JobStatusResponse,
  Mode,
  OutFormat,
  Strength,
  ToastMessage,
} from "../lib/types";

interface JobState {
  inputText: string;
  selectedFile: File | null;
  mode: Mode;
  strength: Strength;
  style: string;
  outFormat: OutFormat;
  currentJobId: string | null;
  isSubmitting: boolean;
  activeJob: JobStatusResponse | null;
  error: string | null;
  toast: ToastMessage | null;
  model: string;
  setModel: (model: string) => void;
  setInputText: (text: string) => void;
  setSelectedFile: (file: File | null) => void;
  setMode: (mode: Mode) => void;
  setStrength: (strength: Strength) => void;
  setStyle: (style: string) => void;
  setOutFormat: (outFormat: OutFormat) => void;
  setCurrentJobId: (id: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setActiveJob: (job: JobStatusResponse | null) => void;
  setError: (error: string | null) => void;
  setToast: (toast: ToastMessage | null) => void;
  reset: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  inputText: "",
  selectedFile: null,
  mode: "rules",
  strength: "light",
  style: "",
  model: "",
  outFormat: "same",
  currentJobId: null,
  isSubmitting: false,
  activeJob: null,
  error: null,
  toast: null,
  setModel: (model) => set({ model }),
  setInputText: (inputText) => set({ inputText, selectedFile: null }),
  setSelectedFile: (selectedFile) => set({ selectedFile, inputText: "" }),
  setMode: (mode) => set({ mode }),
  setStrength: (strength) => set({ strength }),
  setStyle: (style) => set({ style }),
  setOutFormat: (outFormat) => set({ outFormat }),
  setCurrentJobId: (currentJobId) => set({ currentJobId }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setActiveJob: (activeJob) => set({ activeJob }),
  setError: (error) => set({ error }),
  setToast: (toast) => set({ toast }),
  reset: () =>
    set({
      inputText: "",
      selectedFile: null,
      currentJobId: null,
      isSubmitting: false,
      activeJob: null,
      error: null,
    }),
}));
