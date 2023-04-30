import React from "react";

function GameOver({ exit }) {
  return (
    <div className="modal game-over">
      <p className="h1">Game Over</p>
      <p>You can't beat it!</p>
      <div>
        <button className="game-over-button" onClick={exit}>
          EXIT
        </button>
      </div>
    </div>
  );
}

export default GameOver;
