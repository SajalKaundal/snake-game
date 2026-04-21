// import { useEffect} from "react";
import "./Fruits.css"
const Fruits = ({ fruits }) => {
  // console.log(fruits);
  // useEffect(()=>{
  //   window.addEventListener("keydown", (e) => {
  //     console.log(e.key)
  //     if (e.key === "f") {
  //       setX(Math.floor(Math.random()*1000));
  //       setY(Math.floor(Math.random()*500))
  //     }
  //   });
  // },[])

  // console.log(fruits)
  return (
    <>
      {fruits.map((f,index) => {
        return (
          <div key={index}
            style={{
              position: "fixed",
              height: "30px",
              width: "30px",
              // backgroundColor: "red",
              top: f.y,
              left: f.x,
              backgroundSize:"cover"
            }}
            className={f.type}
          ></div>
        );
      })}
    </>
  );
};

export default Fruits;
