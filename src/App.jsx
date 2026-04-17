import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topPosition, setTopPosition] = useState(0);
  const [leftPostion, setLeftPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (e.key === "ArrowUp") {
        setTopPosition((prev) => prev - 10);
      } else if (e.key === "ArrowDown") {
        setTopPosition((prev) => prev + 10);
      } else if (e.key === "ArrowRight") {
        setLeftPosition((prev) => prev + 10);
      } else if (e.key === "ArrowLeft") {
        setLeftPosition((prev) => prev - 10);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return window.removeEventListener("keydown",handleKeyDown)
  }, []);

  console.log(`topPosition ${topPosition}`);
  console.log(`leftPostion ${leftPostion}`);
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
            left: leftPostion,
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
