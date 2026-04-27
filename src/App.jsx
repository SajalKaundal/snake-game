import "./App.css";
import React, { useState } from "react";
import Fruits from "./components/Fruits";
import Snake from "./components/Snake";
import GameOver from "./components/GameOver";
import Score from "./components/Score";
import Header from "./components/Header";
import LeaderBoard from "./components/LeaderBoard";
import GameScreen from "./components/GameScreen";

function App() {
  const [score, setScore] = useState(0);
  const [input,setInput] = useState("")
  return (
    <div className="container-fluid m-0 p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="row m-0 border-bottom">
        <div className="col-12 text-center p-3">
          <Header />
        </div>
      </div>
      
      <div className="row m-0 flex-grow-1">
        <div className="col-lg-2 col-md-2 border-end d-flex flex-column justify-content-center pt-5">
          <Score score={score} />
        </div>
        
        <div className="col-lg-8 col-md-8 p-0 d-flex position-relative game-container">
          <GameScreen setScore={setScore} input={input} setInput={setInput} />
        </div>
        
        <div className="col-lg-2 col-md-2 border-start d-flex flex-column justify-content-center pt-5">
          <LeaderBoard  setInput={setInput}/>
        </div>
      </div>
    </div>
  );
}

export default App;
