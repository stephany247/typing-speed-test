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

const data = passagesData as PassageData;

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [passage, setPassage] = useState<PassageType | null>(null);
  const [restart, setRestart] = useState(0);

  const restartTest = () => {
    setRestart((prev) => prev + 1);
  };

  useEffect(() => {
    const passages = data[difficulty];
    const random = passages[Math.floor(Math.random() * passages.length)];
    setPassage(random);
  }, [difficulty]);

  return (
    <>
      <Header />
      <Controls difficulty={difficulty} setDifficulty={setDifficulty} />
      {passage && <Passage text={passage.text} onRestart={restartTest} />}
    </>
  );
}

export default App;
