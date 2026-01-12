type StatsInput = {
  typed: string
  errors: number[]
  elapsedTime: number // seconds
}

export function calculateStats({ typed, errors, elapsedTime }: StatsInput) {
  const totalTyped = typed.length
  const incorrect = errors.length
  const correct = Math.max(totalTyped - incorrect, 0)

  const minutes = elapsedTime / 60
  const wpm =
    minutes > 0 ? Math.round((correct / 5) / minutes) : 0

  const accuracy =
    totalTyped > 0
      ? Math.round((correct / totalTyped) * 100)
      : 100

  return {
    wpm,
    accuracy,
    correct,
    incorrect,
  }
}
