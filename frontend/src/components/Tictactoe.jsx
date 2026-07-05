import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winner) status = `Winner: ${winner}`;
  else if (isDraw) status = "It's a draw!";
  else status = `${xIsNext ? "X" : "O"}'s turn`;

  return (
    <div className="relax-panel relax-tictactoe">
      <p className="relax-tictactoe-status">{status}</p>

      <div className="relax-tictactoe-board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`relax-tictactoe-cell ${cell ? `filled-${cell}` : ""}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="relax-secondary-btn" onClick={reset}>
        <FaRedo /> New Game
      </button>
    </div>
  );
}