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

const data = passagesData as PassageData;

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [passage, setPassage] = useState<PassageType | null>(null);
  // const [restart, setRestart] = useState(0);
  const text = passage?.text
  const { hasStarted, typed, errors, startGame, resetGame } = useTypingTest(
    text ?? "",
    "timed"
  );


  useEffect(() => {
    const passages = data[difficulty];
    const random = passages[Math.floor(Math.random() * passages.length)];
    setPassage(random);
  }, [difficulty]);

  return (
    <>
      <Header />
      <Controls difficulty={difficulty} setDifficulty={setDifficulty} />
      {passage && (
        // <Passage
        //   text={passage.text}
        //   onRestart={restartTest}
        //   hasStarted={hasStarted}
        // />
        <Passage
          text={passage.text}
          hasStarted={hasStarted}
          typed={typed}
          errors={errors}
          onStart={startGame}
          onRestart={resetGame}
        />
      )}
    </>
  );
}

export default App;
