import { useEffect, useState } from "react";
import "./Snake.css";
import generateFruit from "../utils/generateFruit";
import gameOver from "../utils/gameOver";
import GameOver from "./GameOver";

function fruitBit(fruits, headX, headY) {
  const hitIndex = fruits.findIndex((f) => f.x === headX && f.y === headY);
  return hitIndex;
}

function bodyImage(direction, prevDirection) {
  // straight
  if (direction === prevDirection) {
    return `snake-body-${prevDirection}`;
  }

  // corners
  if (
    (prevDirection === "Up" && direction === "Right") ||
    (prevDirection === "Left" && direction === "Down")
  ) {
    return "snake-body-topleft";
  }

  if (
    (prevDirection === "Up" && direction === "Left") ||
    (prevDirection === "Right" && direction === "Down")
  ) {
    return "snake-body-topright";
  }

  if (
    (prevDirection === "Down" && direction === "Right") ||
    (prevDirection === "Left" && direction === "Up")
  ) {
    return "snake-body-bottomleft";
  }

  if (
    (prevDirection === "Down" && direction === "Left") ||
    (prevDirection === "Right" && direction === "Up")
  ) {
    return "snake-body-bottomright";
  }

  return `snake-body-${prevDirection}`;
}

function Snake({ snake, setSnake, setFruits, fruits }) {
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState("Up");
  const [visible, setVisible] = useState("d-none");
  const [isGameOver, setIsGameOver] = useState(false);

  const cellSize = 30;

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if ((key === "ARROWUP" || key === "W") && direction !== "Down") {
        // setTopPosition((prev) => prev - 10);
        setDirection("Up");
      } else if ((key === "ARROWDOWN" || key === "S") && direction !== "Up") {
        // setTopPosition((prev) => prev + 10);
        setDirection("Down");
      } else if (
        (key === "ARROWRIGHT" || key === "D") &&
        direction !== "Left"
      ) {
        // setLeftPosition((prev) => prev + 10);
        setDirection("Right");
      } else if (
        (key === "ARROWLEFT" || key === "A") &&
        direction !== "Right"
      ) {
        // setLeftPosition((prev) => prev - 10);
        setDirection("Left");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isGameOver) {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };
        const next = { ...newSnake[1] };
        const maxX = Math.floor(width / cellSize) * cellSize;
        const maxY = Math.floor(height / cellSize) * cellSize;

        if (direction === "Up") {
          if (head.y <= 0) {
            head.y = maxY - cellSize;
          } else {
            head.y -= cellSize;
          }
          head.direction = "Up";
        }

        if (direction === "Down") {
          if (head.y >= maxY - cellSize) {
            head.y = 0;
          } else {
            head.y += cellSize;
          }
          head.direction = "Down";
        }

        if (direction === "Left") {
          if (head.x <= 0) {
            head.x = maxX - cellSize;
          } else {
            head.x -= cellSize;
          }
          head.direction = "Left";
        }

        if (direction === "Right") {
          if (head.x >= maxX - cellSize) {
            head.x = 0;
          } else {
            head.x += cellSize;
          }
          head.direction = "Right";
        }

        // console.log(x, y, head.x, head.y);
        newSnake.unshift(head); // add new head
        const index = fruitBit(fruits, head.x, head.y);
        if (index !== -1) {
          // setSpeed((prev)=>prev-2)
          setFruits((prev) => {
            const newFruits = [...prev];
            newFruits[index] = generateFruit(newSnake);
            return newFruits;
          });
        } else {
          newSnake.pop(); // remove tail
        }
        if (gameOver(newSnake)) {
          clearInterval(interval);
          setVisible("d-block");
          setIsGameOver(true);
        }
        for (let i = 1; i < newSnake.length; i++) {
          if(i===newSnake.length-1){
            newSnake[i].direction = newSnake[i - 1].direction
          }
          newSnake[i].prevDirection = newSnake[i - 1].direction;
        }
        return newSnake;
      });
      console.log(snake);
    }, 100);

    return () => clearInterval(interval);
  }, [direction, fruits, height, setFruits, setSnake, speed, width]);
  // console.log(`topPosition ${topPosition}`);
  // console.log(`leftPostion ${leftPosition}`);
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="">{speed}</div>
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`snake-block 
              ${index === 0 ? `snake-head-${segment.direction}` : ""}
              ${index === snake.length - 1 ? `snake-tail-${segment.direction}` : ""}
              ${index > 0 && index < snake.length - 1 ? bodyImage(segment.direction, segment.prevDirection) : ""}
            `}
            style={{
              top: segment.y,
              left: segment.x,
            }}
          >
            {" "}
            <div
              className={index === 0 && index === snake.length && "snake-round"}
            ></div>
          </div>
        ))}
        <GameOver visible={visible} setVisible={setVisible} />
      </div>
    </>
  );
}

export default Snake;
