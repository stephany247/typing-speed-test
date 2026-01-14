import { useEffect, useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import type {
  Difficulty,
  Passage as PassageType,
  PassageData,
} from "./types/passage";
import Passage from "./components/Passage";
import passagesData from "./data/data.json";
import { useTypingTest } from "./hooks/useTypingTest";
import { calculateStats } from "./utils/calculateStats";
import Results from "./components/Results";

const data = passagesData as PassageData;
export type ModeConfig =
  | { mode: "timed"; duration: number }
  | { mode: "passage" };

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [passage, setPassage] = useState<PassageType | null>(null);
  const [modeConfig, setModeConfig] = useState<ModeConfig>({
    mode: "timed",
    duration: 30,
  });

  const text = passage?.text;
  const {
    hasStarted,
    typed,
    errors,
    startGame,
    resetGame,
    elapsedTime,
    timeLeft,
    isTesting,
    accuracyErrors,
    accuracyHistory,
  } = useTypingTest(text ?? "", modeConfig);

  const stats = calculateStats({
    accuracyErrors,
    accuracyHistory,
    elapsedTime,
  });

  useEffect(() => {
    const passages = data[difficulty];
    const random = passages[Math.floor(Math.random() * passages.length)];
    setPassage(random);
  }, [difficulty]);

  const displayTime = modeConfig.mode === "timed" ? timeLeft : elapsedTime;
  // const isFinished =
  //   (modeConfig.mode === "timed" && timeLeft === 0) ||
  //   (modeConfig.mode === "passage" &&
  //     typed.length > 0 &&
  //     typed.length === passage?.text.length);

  const isFinished =
    (modeConfig.mode === "timed" && timeLeft === 0) ||
    (typed.length > 0 && typed.length === passage?.text.length);

  return (
    <>
      <Header />
      <Controls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        time={displayTime}
        modeConfig={modeConfig}
        setModeConfig={setModeConfig}
        onReset={resetGame}
        isTesting={isTesting}
      />
      {passage && !isFinished && (
        <Passage
          text={passage.text}
          hasStarted={hasStarted}
          typed={typed}
          errors={errors}
          onStart={startGame}
          onRestart={resetGame}
        />
      )}

      {isFinished && (
        <Results
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          characters={typed.length}
          totalTyped={typed.length}
          errorCount={errors.length}
          bestWpm={92} // placeholder for now
          onRestart={resetGame}
        />
      )}
    </>
  );
}

export default App;
