import "./App.css";
import Fruits from "./components/Fruits";
import Snake from "./components/Snake";
import { useState } from "react";
function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [x, setX] = useState(
    () => Math.floor(Math.random() * (width / 30)) * 30,
  );
  const [y, setY] = useState(
    () => Math.floor(Math.random() * (height / 30)) * 30,
  );
  return (
    <>
      <Snake x={x} y={y} setX={setX} setY={setY} />
      <Fruits x={x} y={y} />
    </>
  );
}

export default App;
