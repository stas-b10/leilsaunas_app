const STORAGE_KEY = "leil_compare";
const EVENT_NAME = "leil-compare-changed";

function emitComparisonChange() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getComparisonIds(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (id): id is string => typeof id === "string"
    );
  } catch {
    return [];
  }
}

export function addToComparison(modelId: string): boolean {
  const current = getComparisonIds();

  if (current.includes(modelId)) {
    return true;
  }

  if (current.length >= 2) {
    return false;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...current, modelId])
  );

  emitComparisonChange();

  return true;
}

export function removeFromComparison(modelId: string) {
  const current = getComparisonIds();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      current.filter((id) => id !== modelId)
    )
  );

  emitComparisonChange();
}

export function clearComparison() {
  localStorage.removeItem(STORAGE_KEY);
  emitComparisonChange();
}

export function isInComparison(modelId: string): boolean {
  return getComparisonIds().includes(modelId);
}

export function getComparisonCount(): number {
  return getComparisonIds().length;
}

export function subscribeToComparison(
  callback: () => void
) {
  window.addEventListener(EVENT_NAME, callback);

  return () => {
    window.removeEventListener(EVENT_NAME, callback);
  };
}

