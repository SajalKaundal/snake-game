import { useEffect, useState } from "react";
import "./Snake.css"

function Snake() {
  const [direction, setDirection] = useState("Up");

  const width = window.innerWidth;
  const height = window.innerHeight;
  const [snake, setSnake] = useState( Array.from({ length: 10 }, (_, i) => ({ x: 0, y: i*10 })));


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

        if (direction === "Up") {
          if (head.y < 1) {
            head.y = height;
          } else {
            head.y -= 10;
          }
        }
        if (direction === "Down")
          if (head.y > height - 10) {
            head.y = 1;
          } else {
            head.y += 10;
          }
        if (direction === "Left")
          if (head.x < 1) {
            head.x = width;
          } else {
            head.x -= 10;
          }
        if (direction === "Right")
          if (head.x > width - 10) {
            head.x = 1;
          } else {
            head.x += 10;
          }

        newSnake.unshift(head); // add new head
        newSnake.pop(); // remove tail

        return newSnake;
      });
    }, 50);

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
            className="snake-block"
            style={{
              top: segment.y,
              left: segment.x,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Snake;
