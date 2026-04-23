function Score({score = 0}){
  return (
    <div className="text-center w-100">
      <h4 className="mb-3 text-decoration-underline">Current Score</h4>
      <h1 className="display-4 fw-bold">{score}</h1>
    </div>
  )
}

export default Score