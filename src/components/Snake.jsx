import { useEffect, useState } from "react";
import "./Snake.css";

function fruitBit(fruitX, fruitY, headX, headY) {
  if (fruitX === headX && fruitY === headY) {
    return true;
  }
  return false;
}

function Snake({ x, y, setX, setY }) {
  const [direction, setDirection] = useState("Up");

  const cellSize = 30;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const [snake, setSnake] = useState(
    Array.from({ length: 10 }, (_, i) => ({ x: 0, y: i * 30 })),
  );

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        const maxX = Math.floor(width / cellSize) * cellSize;
        const maxY = Math.floor(height / cellSize) * cellSize;

        if (direction === "Up") {
          if (head.y <= 0) {
            head.y = maxY - cellSize;
          } else {
            head.y -= cellSize;
          }
        }

        if (direction === "Down") {
          if (head.y >= maxY - cellSize) {
            head.y = 0;
          } else {
            head.y += cellSize;
          }
        }

        if (direction === "Left") {
          if (head.x <= 0) {
            head.x = maxX - cellSize;
          } else {
            head.x -= cellSize;
          }
        }

        if (direction === "Right") {
          if (head.x >= maxX - cellSize) {
            head.x = 0;
          } else {
            head.x += cellSize;
          }
        }

        newSnake.unshift(head); // add new head
        console.log(x, y, head.x, head.y);
        if (fruitBit(x, y, head.x, head.y)) {
          const maxX = Math.floor(width / cellSize);
          const maxY = Math.floor(height / cellSize);
          setX(Math.floor(Math.random() * maxX) * cellSize);
          setY(Math.floor(Math.random() * maxY) * cellSize);
        } else {
          newSnake.pop(); // remove tail
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);
  // console.log(`topPosition ${topPosition}`);
  // console.log(`leftPostion ${leftPosition}`);
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`${index === 0 && "snake-head"} ${index === snake.length - 1 && "snake-tail"} snake-block ${direction.toLowerCase()}`}
            style={{
              top: segment.y,
              left: segment.x,
            }}
          > <div className={(index===0&&index===snake.length)&&"snake-round"}></div></div>
        ))}
      </div>
    </>
  );
}

export default Snake;
