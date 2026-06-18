"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getServerTheme,
  getTheme,
  initThemeFromDom,
  subscribe,
  type Theme,
} from "@/lib/theme";

/** Subscribe to the active theme. Re-renders only when the theme changes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme);
}

/**
 * Syncs the in-memory theme store with the `data-theme` the inline head script
 * already applied to the document (prevents a flash of the wrong theme).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initThemeFromDom();
  }, []);

  return <>{children}</>;
}
