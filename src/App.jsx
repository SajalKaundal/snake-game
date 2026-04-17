import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [direction, setDirection] = useState("Up");
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase()
      if (key === "ARROWUP"|| key === "W") {
        // setTopPosition((prev) => prev - 10);
        setDirection("Up");
      } else if (key === "ARROWDOWN"|| key === "S") {
        // setTopPosition((prev) => prev + 10);
        setDirection("Down");
      } else if (key === "ARROWRIGHT"|| key === "D") {
        // setLeftPosition((prev) => prev + 10);
        setDirection("Right");
      } else if (key === "ARROWLEFT"|| key === "A") {
        // setLeftPosition((prev) => prev - 10);
        setDirection("Left");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(() => {
      if (direction === "Up") {
        setTopPosition((prev) => {
          if (prev < 0) {
            return height;
          }
          return prev - 1;
        });
      } else if (direction === "Down") {
        setTopPosition((prev) => {
          if (prev > height) {
            return 0;
          }
          return prev + 1;
        });
      } else if (direction === "Left") {
        setLeftPosition((prev) => {
          if (prev < 0) {
            return width;
          }
          return prev - 1;
        });
      } else if (direction === "Right") {
        setLeftPosition((prev) => {
          if (prev > width) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 2);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [direction]);

  // console.log(`topPosition ${topPosition}`);
  // console.log(`leftPostion ${leftPosition}`);
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "blue",
            position: "fixed",
            top: topPosition,
            left: leftPosition,
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
