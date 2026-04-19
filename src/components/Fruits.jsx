// import { useEffect} from "react";

const Fruits = ({ fruits }) => {
  console.log(fruits);
  // useEffect(()=>{
  //   window.addEventListener("keydown", (e) => {
  //     console.log(e.key)
  //     if (e.key === "f") {
  //       setX(Math.floor(Math.random()*1000));
  //       setY(Math.floor(Math.random()*500))
  //     }
  //   });
  // },[])

  return (
    <>
      {fruits.map((f) => {
        return (
          <div
            style={{
              position: "fixed",
              height: "30px",
              width: "30px",
              backgroundColor: "red",
              top: f.y,
              left: f.x,
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Fruits;
