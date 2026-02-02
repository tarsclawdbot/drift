const STORAGE_KEY = "drift_saved_prompts";

export function getSavedPrompts(): string[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function savePrompt(promptId: string): void {
  if (typeof window === "undefined") return;
  const saved = getSavedPrompts();
  if (!saved.includes(promptId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, promptId]));
  }
}

export function unsavePrompt(promptId: string): void {
  if (typeof window === "undefined") return;
  const saved = getSavedPrompts();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(saved.filter((id) => id !== promptId))
  );
}

export function isPromptSaved(promptId: string): boolean {
  if (typeof window === "undefined") return false;
  return getSavedPrompts().includes(promptId);
}
