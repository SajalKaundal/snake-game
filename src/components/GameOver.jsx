function GameOver({ visible, setVisible }) {
  return (
    <div
      className={`position-fixed top-50 start-50 translate-middle ${visible}`}
      style={{ zIndex: 1000 }}
    >
      <div className="card text-center shadow-lg border-0 rounded-4">
        <div className="card-body p-5 bg-light rounded-4">
          <h2 className="mb-3 text-danger fw-bold">Game Over</h2>
          <p className="text-muted mb-4">Better luck next time!</p>

          <button
            className="btn btn-success px-4 py-2 fw-semibold"
            onClick={() => {
              setVisible("d-none");
              restartGame();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;