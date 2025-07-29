import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /** Checks the board for a winner. */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app component for Tic Tac Toe.
   * Provides a 3x3 game grid, handles player moves,
   * win/draw status, and allows game reset.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((sq) => sq);

  // PUBLIC_INTERFACE
  function handleClick(index) {
    /** Handle clicking a square for a move. */
    if (winner || squares[index]) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /** Reset the game. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((val, idx) => (
          <button
            className="square"
            key={idx}
            onClick={() => handleClick(idx)}
            data-testid={`square-${idx}`}
          >
            {val}
          </button>
        ))}
      </div>
      <button className="restart-btn" onClick={handleRestart} data-testid="restart">
        Restart Game
      </button>
    </div>
  );
}

export default App;
