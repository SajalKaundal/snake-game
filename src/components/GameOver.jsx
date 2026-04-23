function GameOver({ setIsGameOver }) {
  return (
    <div className="text-center p-5 z-1 border-1 shadow bg-white rounded-2 position-absolute ">
      <h2>Game Over</h2>
      <button
        className="btn btn-danger"
        onClick={() => {
          setIsGameOver(false);
          window.location.reload();
        }}
      >
        Retry
      </button>
    </div>
  );
}

export default GameOver;
