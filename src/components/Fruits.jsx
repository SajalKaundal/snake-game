import { useEffect, useState } from "react";

const Fruits = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(100);
  useEffect(()=>{
    window.addEventListener("keydown", (e) => {
      console.log(e.key)
      if (e.key === "f") {
        setX(Math.floor(Math.random()*1000));
        setY(Math.floor(Math.random()*500))
      }
    });
  },[])

  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "10px",
          width: "10px",
          backgroundColor:"red",
          top: y,
          left: x,
        }}
      ></div>
    </>
  );
};

export default Fruits;
