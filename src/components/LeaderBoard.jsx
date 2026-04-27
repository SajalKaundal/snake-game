import "./LeaderBoard.css"

function LeaderBoard({ setInput }) {
  return (
    <div className="text-center w-100">

      {/* Leaderboard → Hidden on mobile */}
      <div className="d-none d-md-block">
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
      </div>

      {/* Controls */}
      <div className="controls-section">
        <h5 className="mb-4 text-decoration-underline">Controls</h5>

        <div className="controller-grid mx-auto">
          <button onClick={() => setInput("W")}>↑</button>

          <div className="middle-row">
            <button onClick={() => setInput("A")}>←</button>
            <button onClick={() => setInput("S")}>↓</button>
            <button onClick={() => setInput("D")}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;