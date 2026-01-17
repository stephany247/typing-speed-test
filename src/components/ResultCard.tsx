import type { Config } from "../hooks/useTypingTest";

type ResultCardProps = {
  wpm: number;
  accuracy: number;
  difficulty: string;
  mode: Config;
  category: string;
  totalTyped: number;
  errorCount: number;
};

export function ResultCard({
  wpm,
  accuracy,
  difficulty,
  mode,
  category,
  totalTyped,
  errorCount,
}: ResultCardProps) {
  return (
    <div className="w-120 h-50 bg-neutral-900 text-neutral-0 rounded-xl p-4 flex flex-col justify-between shadow-xl">
      <h3 className="text-lg font-semibold">Typing Speed Test</h3>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-neutral-400">WPM</p>
          <p className="text-3xl font-bold">{wpm}</p>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-neutral-400">Accuracy</p>
          <p className="text-3xl font-bold">{accuracy}%</p>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-neutral-400">Characters</p>
          <span className="flex items-center gap-1">
            <span className="text-green-500">{totalTyped}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-red-500">{errorCount}</span>
          </span>
        </div>
      </div>

      <div className="text-sm text-blue-400 grid grid-cols-3 gap-4 items-center">
        <span>
          <span className="uppercase text-neutral-500 mr-1">Category:</span>
          <span className="capitalize">{category}</span>
        </span>
        <span>
          <span className="uppercase text-neutral-500 mr-1">Difficulty:</span>
          <span className="capitalize">{difficulty}</span>
        </span>
        <span>
          <span className="uppercase text-neutral-500 mr-1">Mode:</span>
          <span className="capitalize">
            {mode.mode === "timed" ? `Timed (${mode.duration}s)` : "Passage"}
          </span>
        </span>
      </div>
    </div>
  );
}
