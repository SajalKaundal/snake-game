import "./App.css";
import Fruits from "./components/Fruits";
import Snake from "./components/Snake";
import { useState, useEffect } from "react";
import generateFruit from "./utils/generateFruit";
import GameOver from "./components/GameOver";

function App() {
  const [start,setStart] = useState(false)
  const [snake, setSnake] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      x: 0,
      y: i * 30,
      direction: "Up",
      prevDirection: "Up",
    })),
  );
  const [fruits, setFruits] = useState(() => {
    const initialFruits = [];
    for (let i = 0; i < 50; i++) {
      initialFruits.push(generateFruit(snake, initialFruits));
    }
    return initialFruits;
  });
  useEffect(() => {
    console.log("fruit changed");
  }, [fruits]);
  // console.log(generateFruit(snake))
  // console.log(snake)
  // console.log(fruits)

  return (
    <>
      <Snake
        snake={snake}
        setSnake={setSnake}
        setFruits={setFruits}
        fruits={fruits}
        start={start}
        setStart={setStart}
      />
      <Fruits fruits={fruits} />
    </>
  );
}

export default App;
