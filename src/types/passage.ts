export type Difficulty = "easy" | "medium" | "hard"
export type Category = "general" | "quotes" | "lyrics" | "code";

export type Passage = {
  id: string
  text: string
}

export type PassageData = Record<
  Category,
  Record<Difficulty, Passage[]>
>;
