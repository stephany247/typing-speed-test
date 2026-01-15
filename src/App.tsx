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
import { getBestWpm, setBestWpm } from "./utils/storage";

export type ModeConfig =
  | { mode: "timed"; duration: number }
  | { mode: "passage" };

const data = passagesData as PassageData;

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [passage, setPassage] = useState<PassageType | null>(null);
  const [modeConfig, setModeConfig] = useState<ModeConfig>({
    mode: "timed",
    duration: 60,
  });
  const [bestWpm, setBestWpmState] = useState<number | null>(() =>
    getBestWpm()
  );

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

  const pickRandomPassage = () => {
    const passages = data[difficulty];
    const random = passages[Math.floor(Math.random() * passages.length)];
    setPassage(random);
  };

  useEffect(() => {
    pickRandomPassage();
  }, [difficulty]);

  const handleRestart = () => {
  resetGame()
  pickRandomPassage()
}


  const displayTime = modeConfig.mode === "timed" ? timeLeft : elapsedTime;

  const isFinished =
    (modeConfig.mode === "timed" && timeLeft === 0) ||
    (typed.length > 0 && typed.length === passage?.text.length);

  // const bestWpm = getBestWpm();

  const [resultFlags, setResultFlags] = useState({
    isFirstTest: false,
    isNewHighScore: false,
  });

  useEffect(() => {
    if (!isFinished) return;

    const prevBest = bestWpm;

    if (prevBest === null) {
      setResultFlags({ isFirstTest: true, isNewHighScore: false });
      setBestWpm(stats.wpm);
      setBestWpmState(stats.wpm);
    } else if (stats.wpm > prevBest) {
      setResultFlags({ isFirstTest: false, isNewHighScore: true });
      setBestWpm(stats.wpm);
      setBestWpmState(stats.wpm);
    } else {
      setResultFlags({ isFirstTest: false, isNewHighScore: false });
    }
  }, [isFinished]);

  return (
    <>
      <Header bestWPM={bestWpm ?? stats.wpm} />
      {!isFinished && (
        <Controls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          time={displayTime}
          modeConfig={modeConfig}
          setModeConfig={setModeConfig}
          onReset={handleRestart}
          isTesting={isTesting}
        />
      )}
      {passage && !isFinished && (
        <Passage
          text={passage.text}
          hasStarted={hasStarted}
          typed={typed}
          errors={errors}
          onStart={startGame}
          onRestart={handleRestart}
        />
      )}

      {isFinished && (
        <Results
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          totalTyped={typed.length}
          errorCount={accuracyErrors.length}
          isFirstTest={resultFlags.isFirstTest}
          isNewHighScore={resultFlags.isNewHighScore}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
