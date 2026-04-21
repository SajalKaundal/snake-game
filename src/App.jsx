import "./App.css";
import Fruits from "./components/Fruits";
import Snake from "./components/Snake";
import { useState } from "react";
import generateFruit from "./utils/generateFruit";
import GameOver from "./components/GameOver";


function App() {
  const [snake, setSnake] = useState(
    Array.from({ length: 10 }, (_, i) => ({ x: 0, y: i * 30,direction:"Up",prevDirection:"Up" })),
  );
  const [fruits, setFruits] = useState(
    Array.from({ length: 10 }, () => generateFruit(snake)),
  );
  console.log(snake)
  // console.log(fruits)
  return (
    <>
      <Snake snake={snake} setSnake={setSnake} setFruits={setFruits} fruits={fruits}/>
      <Fruits fruits={fruits} />
      
    </>
  );
}

export default App;
