export type Difficulty = "easy" | "medium" | "hard"

export type Passage = {
  id: string
  text: string
}

export type PassageData = {
  easy: Passage[]
  medium: Passage[]
  hard: Passage[]
}
