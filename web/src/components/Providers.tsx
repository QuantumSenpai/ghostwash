"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "./ui/Toast";
import { useJobStore } from "../store/useJobStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  const toast = useJobStore((s) => s.toast);
  const setToast = useJobStore((s) => s.setToast);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </QueryClientProvider>
  );
}
