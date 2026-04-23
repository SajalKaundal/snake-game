function LeaderBoard(){
  return (
    <div className="text-center w-100">
      <h4 className="mb-4 text-decoration-underline">Leaderboard</h4>
      <div className="mb-5">
        <div className="d-flex justify-content-between px-3 mb-2">
          <span className="fw-bold">SajalKaundal:</span>
          <span>100000</span>
        </div>
        <div className="d-flex justify-content-between px-3 mb-2">
          <span className="fw-bold">John:</span>
          <span>1000</span>
        </div>
      </div>
      
      <h5 className="mb-3 text-decoration-underline">Controls</h5>
      <div className="row justify-content-center mx-auto" style={{ maxWidth: '150px' }}>
        <div className="col-12 mb-2">
          <button className="btn btn-outline-dark fw-bold px-3 py-2 w-100">W</button>
        </div>
        <div className="col-4 px-1">
          <button className="btn btn-outline-dark fw-bold px-2 py-2 w-100">A</button>
        </div>
        <div className="col-4 px-1">
          <button className="btn btn-outline-dark fw-bold px-2 py-2 w-100">S</button>
        </div>
        <div className="col-4 px-1">
          <button className="btn btn-outline-dark fw-bold px-2 py-2 w-100">D</button>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard;