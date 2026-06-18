"use client";

import { useSyncExternalStore } from "react";
import { getScene, subscribe } from "@/lib/experience";

/**
 * Subscribe a component to the active scene index. Only re-renders when the
 * nearest scene changes, never on every scroll frame.
 */
export function useActiveScene() {
  return useSyncExternalStore(subscribe, getScene, () => 0);
}
