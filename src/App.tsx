import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Controls from "./components/Controls";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Controls />
    </>
  );
}

export default App;
