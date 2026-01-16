type StatsInput = {
  accuracyErrors: number[]
  accuracyHistory: boolean[]
  elapsedTime: number // seconds
}

export function calculateStats({ accuracyErrors, accuracyHistory, elapsedTime }: StatsInput) {
  const incorrect = accuracyErrors.length
  const total = accuracyHistory.length
  const correct = total - incorrect

  const minutes = elapsedTime / 60
  const wpm =
    minutes > 0 ? Math.round((correct / 5) / minutes) : 0

  const accuracy =
    total === 0 ? 100 : Math.round((correct / total) * 100)

  return {
    wpm,
    accuracy,
    correct,
    incorrect,
  }
}
