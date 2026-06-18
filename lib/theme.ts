"use client";

/**
 * Tiny render-free theme store. The DOM `data-theme` attribute is the source of
 * truth (set pre-hydration by an inline script to avoid a flash); this module
 * mirrors it in memory and notifies subscribers so both DOM components and the
 * R3F canvas can react via `useSyncExternalStore`.
 */

export type Theme = "dark" | "light";

let theme: Theme = "dark";
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/** Apply a theme: updates the DOM, persists it, and notifies subscribers. */
export function setTheme(next: Theme) {
  theme = next;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }
  emit();
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

export function getTheme(): Theme {
  return theme;
}

/** Stable server snapshot to keep `useSyncExternalStore` happy during SSR. */
export function getServerTheme(): Theme {
  return "dark";
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Read the theme the inline script already committed to the DOM. */
export function initThemeFromDom() {
  if (typeof document === "undefined") return;
  const fromDom = document.documentElement.dataset.theme as Theme | undefined;
  theme = fromDom === "light" ? "light" : "dark";
  emit();
}
