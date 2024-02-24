// app/providers.tsx
"use client";
import { AppProvider } from "@/context/AppProviderContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </AppProvider>
  );
}
