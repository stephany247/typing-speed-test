import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import type {
  Difficulty,
  Passage as PassageType,
  Category,
} from "./types/passage";
import Passage from "./components/Passage";
import passagesData from "./data/data.json";
import { useTypingTest } from "./hooks/useTypingTest";
import { calculateStats } from "./utils/calculateStats";
import Results from "./components/Results";
import { getBestWpm, saveResult } from "./utils/storage";
import HistoryDialog from "./components/HistoryDialog";
import { ResultCard } from "./components/ResultCard";
import { toPng } from "html-to-image";

export type ModeConfig =
  | { mode: "timed"; duration: number }
  | { mode: "passage" };

const data = passagesData;

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
  const [showHistory, setShowHistory] = useState(false);
  const [category, setCategory] = useState<Category>("general");
  const cardRef = useRef<HTMLDivElement | null>(null);

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
    handleCharInput,
  } = useTypingTest(text ?? "", modeConfig);

  const stats = calculateStats({
    accuracyErrors,
    accuracyHistory,
    elapsedTime,
  });

  const pickRandomPassage = () => {
    let passages: PassageType[];

    if (category === "general") {
      passages = data[difficulty];
    } else {
      passages = data[category][difficulty];
    }
    const random = passages[Math.floor(Math.random() * passages.length)];
    setPassage(random);
  };

  useEffect(() => {
    pickRandomPassage();
  }, [difficulty, category]);

  const handleRestart = () => {
    resetGame();
    pickRandomPassage();
  };

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

    saveResult({
      date: Date.now(),
      mode: modeConfig.mode,
      duration: modeConfig.mode === "timed" ? modeConfig.duration : undefined,
      difficulty,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
    });

    if (prevBest === null) {
      setResultFlags({ isFirstTest: true, isNewHighScore: false });
      setBestWpmState(stats.wpm);
    } else if (stats.wpm > prevBest) {
      setResultFlags({ isFirstTest: false, isNewHighScore: true });
      // setBestWpm(stats.wpm);
      setBestWpmState(stats.wpm);
    } else {
      setResultFlags({ isFirstTest: false, isNewHighScore: false });
    }
  }, [isFinished]);

  const handleShare = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current);

    const link = document.createElement("a");
    link.download = "typing-result.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      {showHistory && <HistoryDialog onClose={() => setShowHistory(false)} />}

      <Header
        onOpenHistory={() => setShowHistory(true)}
        bestWPM={bestWpm ?? stats.wpm}
      />
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
          category={category}
          setCategory={setCategory}
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
          onCharInput={handleCharInput}
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
          onShare={handleShare}
        />
      )}

      <div className="absolute -left-[9999px]">
        <div ref={cardRef}>
          <ResultCard
            wpm={stats.wpm}
            accuracy={stats.accuracy}
            difficulty={difficulty}
            category={category}
            mode={modeConfig}
            totalTyped={typed.length}
            errorCount={accuracyErrors.length}
          />
        </div>
      </div>
    </>
  );
}

export default App;
