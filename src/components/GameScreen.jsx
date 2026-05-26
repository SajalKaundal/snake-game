import { useState, useEffect, useRef, useLayoutEffect, useReducer } from "react";
import generateFruit from "../utils/generateFruit";
import Snake from "./Snake";
import Fruits from "./Fruits";

const CELL_SIZE = 30;
const FRUITS_QUANTITY = 5;
const SNAKE_SIZE = 5; 
function GameScreen({ setScore,setInput }) {

  const containerRef = useRef();
  const [boardWidth, setBoardWidth] = useState(600);
  const [boardHeight, setBoardHeight] = useState(480);
  const [start, setStart] = useState(false);
  const [snake, setSnake] = useState(() =>
    Array.from({ length: SNAKE_SIZE }, (_, i) => ({
      x: (i * CELL_SIZE)+300,
      y: 270,
      direction: "Left",
      prevDirection: "Left",
    })),
  );
  
  const [fruits, setFruits] = useState(() => {
    const initialFruits = [];
    for (let i = 0; i < FRUITS_QUANTITY; i++) {
      initialFruits.push(generateFruit(snake, initialFruits, boardWidth, boardHeight, CELL_SIZE));
    }
    return initialFruits;
  });

  useEffect(() => {
    console.log("fruit changed");
  }, [fruits]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const newWidth = Math.floor(width / CELL_SIZE) * CELL_SIZE;
        const newHeight = Math.floor(height / CELL_SIZE) * CELL_SIZE;
        
        if (newWidth > 0 && newHeight > 0) {
          setBoardWidth(newWidth);
          setBoardHeight(newHeight);
          
          setFruits(prev => {
            let changed = false;
            const res = prev.map(f => {
              if (f.x >= newWidth || f.y >= newHeight) {
                changed = true;
                return generateFruit(snake, prev, newWidth, newHeight, CELL_SIZE);
              }
              return f;
            });
            return changed ? res : prev;
          });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [snake]);

  return (
    <div ref={containerRef} className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
      <div 
        className="position-relative border border-4 border-light rounded-3"
        style={{
          width: `${boardWidth}px`,
          height: `${boardHeight}px`,
        }}
      >
        <Snake
          snake={snake}
          setSnake={setSnake}
          setFruits={setFruits}
          fruits={fruits}
          start={start}
          setStart={setStart}
          BOARD_WIDTH={boardWidth}
          BOARD_HEIGHT={boardHeight}
          CELL_SIZE={CELL_SIZE}
          setScore={setScore}
          setInput={setInput}
        />
        <Fruits fruits={fruits} />
      </div>
    </div>
  );
}

export default GameScreen;
