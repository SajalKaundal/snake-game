function StartGame({setStart}){

  return (
    <>

    <div className="text-center p-5 z-1 border-1 shadow bg-white rounded-2 ">
      <h2>Start Game</h2>
      <button className="btn btn-success" onClick={()=>{setStart(true)}}>Start</button>

    </div>
    
    </>
  )
}

export default StartGame