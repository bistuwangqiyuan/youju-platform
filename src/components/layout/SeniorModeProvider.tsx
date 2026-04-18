"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  startTransition,
  useState,
  type ReactNode,
} from "react";

interface SeniorModeContextValue {
  seniorMode: boolean;
  toggleSeniorMode: () => void;
}

const SeniorModeContext = createContext<SeniorModeContextValue | null>(null);

const STORAGE_KEY = "youju-senior-mode";

export function SeniorModeProvider({ children }: { children: ReactNode }) {
  const [seniorMode, setSeniorMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      startTransition(() => {
        setSeniorMode(true);
        document.documentElement.setAttribute("data-senior-mode", "true");
      });
    }
  }, []);

  const toggleSeniorMode = useCallback(() => {
    setSeniorMode((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      if (next) {
        document.documentElement.setAttribute("data-senior-mode", "true");
      } else {
        document.documentElement.removeAttribute("data-senior-mode");
      }
      return next;
    });
  }, []);

  return (
    <SeniorModeContext.Provider value={{ seniorMode, toggleSeniorMode }}>
      {children}
    </SeniorModeContext.Provider>
  );
}

export function useSeniorMode() {
  const ctx = useContext(SeniorModeContext);
  if (!ctx) {
    throw new Error("useSeniorMode must be used within SeniorModeProvider");
  }
  return ctx;
}
