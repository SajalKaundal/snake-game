import { useEffect, useState,useRef } from "react";
import "./Snake.css";
import generateFruit from "../utils/generateFruit";
import gameOver from "../utils/gameOver";
import GameOver from "./GameOver";

function fruitBit(fruits, headX, headY) {
  return fruits.findIndex((f) => f.x === headX && f.y === headY);
}

function bodyImage(direction, nextDirection) {
  if (direction === nextDirection) {
    return `snake-body-${nextDirection}`;
  }

  if (
    (nextDirection === "Up" && direction === "Right") ||
    (nextDirection === "Left" && direction === "Down")
  ) {
    return "snake-body-topleft";
  }

  if (
    (nextDirection === "Up" && direction === "Left") ||
    (nextDirection === "Right" && direction === "Down")
  ) {
    return "snake-body-topright";
  }

  if (
    (nextDirection === "Down" && direction === "Right") ||
    (nextDirection === "Left" && direction === "Up")
  ) {
    return "snake-body-bottomleft";
  }

  if (
    (nextDirection === "Down" && direction === "Left") ||
    (nextDirection === "Right" && direction === "Up")
  ) {
    return "snake-body-bottomright";
  }

  return `snake-body-${nextDirection}`;
}

function Snake({ snake, setSnake, setFruits, fruits }) {
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState("Up");
  const [visible, setVisible] = useState("d-none");
  const [isGameOver, setIsGameOver] = useState(false);
  const fruitsRef = useRef(fruits);
  const cellSize = 30;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Keyboard control
  useEffect(() => {
    
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      if ((key === "ARROWUP" || key === "W") && direction !== "Down") {
        setDirection("Up");
      } else if ((key === "ARROWDOWN" || key === "S") && direction !== "Up") {
        setDirection("Down");
      } else if ((key === "ARROWRIGHT" || key === "D") && direction !== "Left") {
        setDirection("Right");
      } else if ((key === "ARROWLEFT" || key === "A") && direction !== "Right") {
        setDirection("Left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Game loop
  useEffect(() => {
    fruitsRef.current = fruits
    const interval = setInterval(() => {
      console.log("snake loop running")
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        const maxX = Math.floor(width / cellSize) * cellSize;
        const maxY = Math.floor(height / cellSize) * cellSize;

        if (direction === "Up") {
          head.y = head.y <= 0 ? maxY - cellSize : head.y - cellSize;
          head.direction = "Up";
        }

        if (direction === "Down") {
          head.y = head.y >= maxY - cellSize ? 0 : head.y + cellSize;
          head.direction = "Down";
        }

        if (direction === "Left") {
          head.x = head.x <= 0 ? maxX - cellSize : head.x - cellSize;
          head.direction = "Left";
        }

        if (direction === "Right") {
          head.x = head.x >= maxX - cellSize ? 0 : head.x + cellSize;
          head.direction = "Right";
        }

        newSnake.unshift(head);

        const index = fruitBit(fruitsRef.current, head.x, head.y);

        if (index !== -1) {
          setScore((prev) => prev + 1);

          setFruits((prevFruits) => {
            const newFruits = [...prevFruits];
            console.log("generate fruit now")
            newFruits[index] = generateFruit(newSnake, newFruits);
            return newFruits;
          });
        } else {
          newSnake.pop();
        }

        if (gameOver(newSnake)) {
          clearInterval(interval);
          setVisible("d-block");
          setIsGameOver(true);
        }

        for (let i = 1; i < newSnake.length; i++) {
          if (i === newSnake.length - 1) {
            newSnake[i].direction = newSnake[i - 1].direction;
          }
          newSnake[i].nextDirection = newSnake[i - 1].direction;
        }

        return newSnake;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fruits]);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="text-center position-fixed top-0 start-0 z-1">
          <h4>Score</h4>
          {score}
        </div>

        {snake.map((segment, index) => (
          <div
            key={index}
            className={`snake-block
              ${index === 0 ? `snake-head-${segment.direction}` : ""}
              ${index === snake.length - 1 ? `snake-tail-${segment.direction}` : ""}
              ${
                index > 0 && index < snake.length - 1
                  ? bodyImage(segment.direction, segment.nextDirection)
                  : ""
              }
            `}
            style={{
              top: segment.y,
              left: segment.x,
            }}
          ></div>
        ))}

        <GameOver visible={visible} setVisible={setVisible} />
      </div>
    </>
  );
}

export default Snake;