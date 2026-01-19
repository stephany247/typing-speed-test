import type { ModeConfig } from "../App";
import { MODE_OPTIONS } from "../data/modes";
import type { Category, Difficulty } from "../types/passage";
import Dropdown from "./Dropdown";
import OptionGroup from "./OptionGroup";

type ControlsProps = {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  wpm: number;
  accuracy: number;
  time: number;
  modeConfig: ModeConfig;
  setModeConfig: (config: ModeConfig) => void;
  onReset: () => void;
  category: string;
  setCategory: (category: Category) => void;
  isTesting: boolean;
};

export default function Controls({
  difficulty,
  setDifficulty,
  wpm,
  accuracy,
  time,
  modeConfig,
  setModeConfig,
  onReset,
  category,
  setCategory,
  isTesting,
}: ControlsProps) {
  return (
    <header className="flex flex-col gap-4 mt-8 lg:flex-row lg:justify-between lg:gap-6 lg:flex-wrap">
      <div className="grid grid-cols-3 items-center justify-center divide-x divide-neutral-700 md:flex md:justify-start">
        <div
          aria-live="polite"
          className="flex flex-col items-center md:flex-row md:gap-4 md:pr-6"
        >
          <span className="text-neutral-400 md:text-lg">WPM:</span>
          <p className="text-xl font-semibold md:text-2xl">{wpm}</p>
        </div>

        <div className="flex flex-col items-center md:flex-row md:gap-4 md:px-6">
          <span className="text-neutral-400 md:text-lg">Accuracy:</span>
          <p
            className={`text-xl font-semibold md:text-2xl ${
              accuracy < 100 ? "text-red-500" : "text-neutral-0"
            }`}
          >
            {accuracy}%
          </p>
        </div>

        <div className="flex flex-col items-center md:flex-row md:gap-4 md:pl-6">
          <span className="text-neutral-400 md:text-lg">Time:</span>
          <p
            aria-label={`Time remaining ${Math.floor(time / 60)} minutes ${
              time % 60
            } seconds`}
            className={`text-xl font-semibold md:text-2xl transition-colors duration-200 ease-in-out ${
              modeConfig.mode === "timed" && time < 10
                ? "text-red-500"
                : isTesting
                ? "text-yellow-400"
                : "text-neutral-0"
            }`}
          >
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col md:flex-row md:flex-wrap md:gap-y-4 divide-x divide-neutral-700">
        <div className="flex items-center gap-2 pr-4">
          <span className="text-neutral-400">Difficulty:</span>
          <OptionGroup
            value={difficulty}
            options={["easy", "medium", "hard"]}
            onSelect={(value) => {
              setDifficulty(value.toLowerCase() as Difficulty);
              onReset();
            }}
            disabled={isTesting}
          />
        </div>

        <div className="flex items-center gap-2 px-4">
          <span className="text-neutral-400">Category:</span>
          <OptionGroup
            value={category}
            options={["general", "quotes", "lyrics", "code"]}
            onSelect={(value) => {
              setCategory(value.toLowerCase() as Category);
              onReset();
            }}
            disabled={isTesting}
          />
        </div>

        <div className="flex items-center gap-2 xl:pl-4">
          <p className="text-neutral-400">Mode:</p>
          <OptionGroup
            value={
              modeConfig.mode === "timed"
                ? `${modeConfig.duration}s`
                : "Passage"
            }
            options={MODE_OPTIONS.map((o) => o.mdLabel)}
            onSelect={(label) => {
              const selected = MODE_OPTIONS.find((o) => o.mdLabel === label);
              if (!selected) return;

              if (selected.mode === "timed") {
                setModeConfig({ mode: "timed", duration: selected.duration });
              } else {
                setModeConfig({ mode: "passage" });
              }

              onReset();
            }}
            disabled={isTesting}
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 md:hidden">
        <Dropdown
          value={difficulty}
          options={["easy", "medium", "hard"]}
          onSelect={(value) => {
            setDifficulty(value.toLowerCase() as Difficulty);
            onReset();
          }}
          disabled={isTesting}
        />

        <Dropdown
          value={category}
          options={["general", "quotes", "lyrics", "code"]}
          onSelect={(value) => {
            setCategory(value.toLowerCase() as Category);
            onReset();
          }}
          disabled={isTesting}
        />

        <Dropdown
          value={
            modeConfig.mode === "timed" ? `${modeConfig.duration}s` : "Passage"
          }
          options={MODE_OPTIONS.map((o) => o.mdLabel)}
          onSelect={(label) => {
            const selected = MODE_OPTIONS.find((o) => o.mdLabel === label);
            if (!selected) return;

            if (selected.mode === "timed") {
              setModeConfig({ mode: "timed", duration: selected.duration });
            } else {
              setModeConfig({ mode: "passage" });
            }

            onReset();
          }}
          disabled={isTesting}
        />
      </div>
    </header>
  );
}
