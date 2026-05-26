import { useEffect, useState } from "react";
import "./Snake.css";
import generateFruit from "../utils/generateFruit";
import gameOver from "../utils/gameOver";
import GameOver from "./GameOver";
import StartGame from "./StartGame";
import fruitBit from "../utils/fruitBit";
import bodyImage from "../utils/bodyImage";
import { useDispatch, useSelector } from "react-redux";
import { Clear } from "../redux/snakeControlSlice";
function Snake({
  snake,
  setSnake,
  setFruits,
  fruits,
  start,
  setStart,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  CELL_SIZE,
  setScore,
}) {
  const [direction, setDirection] = useState("Left");
  const [isGameOver, setIsGameOver] = useState(false);
  const snakeDirection = useSelector((state) => state.snakeControl.direction);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScreenInput = async () => {
      let displayKey = "";
      if (!isGameOver) {
        displayKey = snakeDirection;
      }
      if (displayKey === "Up" && direction !== "Down") {
        // setTopPosition((prev) => prev - 10);
        dispatch(Clear());
        setDirection("Up");
      } else if (displayKey === "Down" && direction !== "Up") {
        // setTopPosition((prev) => prev + 10);
        dispatch(Clear());
        setDirection("Down");
      } else if (displayKey === "Right" && direction !== "Left") {
        // setLeftPosition((prev) => prev + 10);
        dispatch(Clear());
        setDirection("Right");
      } else if (displayKey === "Left" && direction !== "Right") {
        // setLeftPosition((prev) => prev - 10);
        dispatch(Clear());
        setDirection("Left");
      }
    };
    if (snakeDirection) {
      handleScreenInput();
    }

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      let displayKey = "";
      if (!isGameOver) {
        displayKey = snakeDirection;
      }
      if (
        (key === "ARROWUP" || key === "W" || displayKey === "Up") &&
        direction !== "Down"
      ) {
        // setTopPosition((prev) => prev - 10);
        setDirection("Up");
      } else if (
        (key === "ARROWDOWN" || key === "S" || displayKey === "Down") &&
        direction !== "Up"
      ) {
        // setTopPosition((prev) => prev + 10);
        setDirection("Down");
      } else if (
        (key === "ARROWRIGHT" || key === "D" || displayKey === "Right") &&
        direction !== "Left"
      ) {
        // setLeftPosition((prev) => prev + 10);
        setDirection("Right");
      } else if (
        (key === "ARROWLEFT" || key === "A" || displayKey === "Left") &&
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
  }, [direction, isGameOver, snakeDirection, dispatch]);

  useEffect(() => {
    const interval =
      start &&
      setInterval(() => {
        setSnake((prev) => {
          const newSnake = [...prev];
          const head = { ...newSnake[0] };
          const maxX = Math.floor(BOARD_WIDTH / CELL_SIZE) * CELL_SIZE;
          const maxY = Math.floor(BOARD_HEIGHT / CELL_SIZE) * CELL_SIZE;

          if (direction === "Up") {
            if (head.y <= 0) {
              head.y = maxY - CELL_SIZE;
            } else {
              head.y -= CELL_SIZE;
            }
            head.direction = "Up";
          }

          if (direction === "Down") {
            if (head.y >= maxY - CELL_SIZE) {
              head.y = 0;
            } else {
              head.y += CELL_SIZE;
            }
            head.direction = "Down";
          }

          if (direction === "Left") {
            if (head.x <= 0) {
              head.x = maxX - CELL_SIZE;
            } else {
              head.x -= CELL_SIZE;
            }
            head.direction = "Left";
          }

          if (direction === "Right") {
            if (head.x >= maxX - CELL_SIZE) {
              head.x = 0;
            } else {
              head.x += CELL_SIZE;
            }
            head.direction = "Right";
          }

          // console.log(x, y, head.x, head.y);
          newSnake.unshift(head); // add new head
          const index = fruitBit(fruits, head.x, head.y);
          if (index !== -1) {
            setScore((prev) => prev + 1);
            setFruits((prev) => {
              const newFruits = [...prev];
              console.log("SajalKaundal");
              newFruits[index] = generateFruit(
                newSnake,
                newFruits,
                BOARD_WIDTH,
                BOARD_HEIGHT,
                CELL_SIZE,
              );
              return newFruits;
            });
          } else {
            newSnake.pop(); // remove tail
          }
          if (gameOver(newSnake)) {
            clearInterval(interval);
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
        // console.log(snake);
      }, 100);

    return () => clearInterval(interval);
  }, [direction, start, fruits]);
  // console.log(`topPosition ${topPosition}`);
  // console.log(`leftPostion ${leftPosition}`);
  return (
    <div>
      <div
        className="game-board"
        style={{
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
          position: "relative",

          backgroundColor: "#87d226",

          backgroundImage: `
      linear-gradient(45deg, #befd7c 25%, transparent 25%),
      linear-gradient(-45deg, #befd7c 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #befd7c 75%),
      linear-gradient(-45deg, transparent 75%, #befd7c 75%)
    `,

          backgroundSize: `${CELL_SIZE * 2}px ${CELL_SIZE * 2}px`,
          backgroundPosition: `
      0 0,
      0 ${CELL_SIZE}px,
      ${CELL_SIZE}px -${CELL_SIZE}px,
      -${CELL_SIZE}px 0px
    `,
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          {/* <div className="text-centertop-0 start-0">
          <h4>Score</h4>
          {score}
        </div> */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-block
            ${index === 0 ? `snake-head-${segment.direction}` : ""}
              ${index === snake.length - 1 ? `snake-tail-${segment.direction}` : ""}
              ${index > 0 && index < snake.length - 1 ? bodyImage(segment.direction, segment.nextDirection) : ""}
            `}
              style={{
                top: segment.y,
                left: segment.x,
              }}
            >
              {" "}
              <div
                className={
                  index === 0 && index === snake.length && "snake-round"
                }
              ></div>
            </div>
          ))}
          {!start && <StartGame setStart={setStart} />}
          {isGameOver && <GameOver setIsGameOver={setIsGameOver} />}
        </div>
      </div>
    </div>
  );
}

export default Snake;
