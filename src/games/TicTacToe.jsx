import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const navigate = useNavigate();

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = board.every((cell) => cell) && !winner;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400 text-black">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Tic Tac Toe</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto">
        Play against a friend in this classic game of Tic Tac Toe! Take turns to mark X or O on the grid. 
        The first player to align three marks in a row, column, or diagonal wins the game. Good luck!
      </p>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center bg-gray-500 rounded-md text-2xl font-bold cursor-pointer ${
              cell ? 'cursor-not-allowed' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <p className="text-2xl text-red-400 mt-4">Winner: {winner}</p>
      )}
      {isDraw && !winner && (
        <p className="text-2xl text-yellow-400 mt-4">It's a draw!</p>
      )}
      <div className="mt-6 space-x-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
        >
          Restart Game
        </button>
        <button
          onClick={() => navigate('/puzzle')}
          className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
          Back to Puzzles
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
