

function GameOver({visible,setVisible}) {
  
  return (<>
  <div className={`${visible} text-center p-5 rounded-4 bg-info`}>
    <h2>Game Over</h2>
    <button className="btn btn-success" onClick={()=>{setVisible("d-none")
    restartGame()
    }}>Retry</button>
  </div>
  </>)
}

export default GameOver