const STORAGE_KEY = "typing-stats";

type TypingStats = {
  bestWpm: number | null;
  history: {
    date: number;
    mode: "timed" | "passage";
    duration?: number;
    difficulty: "easy" | "medium" | "hard";
    wpm: number;
    accuracy: number;
  }[];
};

export function getStats(): TypingStats {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw
    ? JSON.parse(raw)
    : { bestWpm: null, history: [] };
}

export function getBestWpm() {
  return getStats().bestWpm;
}

export function saveResult(result: TypingStats["history"][0]) {
  const stats = getStats();

  const bestWpm =
    stats.bestWpm === null || result.wpm > stats.bestWpm
      ? result.wpm
      : stats.bestWpm;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      bestWpm,
      history: [result, ...stats.history],
    })
  );
}

export function deleteHistoryItem(index: number) {
  const data = getStats();

  data.history = data.history.filter((_, i) => i !== index);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearHistory() {
  const data = getStats();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...data,
      history: [],
    })
  );
}

