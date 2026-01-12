import type { Difficulty } from "../types/passage";
import Dropdown from "./Dropdown";

type ControlsProps = {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
};

export default function Controls({ difficulty, setDifficulty }: ControlsProps) {
  return (
    <header className="flex flex-col gap-4 mt-8 border-b border-neutral-700 pb-4">
      <div className="grid grid-cols-3 items-center justify-center divide-x divide-neutral-700">
        <div className="flex flex-col items-center">
          <p className="text-neutral-400">WPM:</p>
          <p className="text-xl font-semibold">0</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-neutral-400">Accuracy:</p>
          <p className="text-xl font-semibold">100%</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-neutral-400">Time:</p>
          <p className="text-xl font-semibold">0:60</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Dropdown
          value={difficulty}
          options={["easy", "medium", "hard"]}
          onSelect={(value) => setDifficulty(value.toLowerCase() as Difficulty)}
        />

        <Dropdown
          value="Timed (60s)"
          options={["Timed (60s)", "Passage"]}
          onSelect={() => {}}
        />
      </div>
    </header>
  );
}
