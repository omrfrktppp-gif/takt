import type { PersistedFormState } from "@/lib/ihtiyac-analizi/types";

export const STORAGE_KEY = "takt-ihtiyac-analizi-v2";

export function loadFormState(): PersistedFormState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedFormState;
    if (!parsed.answers || !Array.isArray(parsed.screenHistory)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveFormState(state: PersistedFormState): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota */
  }
}

export function clearFormState(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
