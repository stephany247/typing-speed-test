const BEST_WPM_KEY = "typing-best-wpm"

export function getBestWpm() {
  const value = localStorage.getItem(BEST_WPM_KEY)
  return value ? Number(value) : null
}

export function setBestWpm(wpm: number) {
  localStorage.setItem(BEST_WPM_KEY, String(wpm))
}
