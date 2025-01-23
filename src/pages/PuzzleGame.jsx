import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicTacToe from '../games/TicTacToe';
import MemoryGame from '../games/MemoryGame';
const PuzzleGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/puzzle'); // Navigate back to the puzzle selection page
  };

  // Render game content dynamically based on gameId
  const renderGame = () => {
    switch (gameId) {
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'memory-game':
        return <MemoryGame/>
      case 'jigsaw-puzzle':
        return <div className="text-gray-800 text-xl mt-4">Jigsaw Puzzle Coming Soon!</div>;
      case 'number-puzzle':
        return <div className="text-gray-800 text-xl mt-4">Number Puzzle Coming Soon!</div>;
      default:
        return <div className="text-red-500 text-xl mt-4">Game not found!</div>;
    }
  };

  return (
    <div className="text-center py-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-6 mx-auto">
       
        <div className="mt-6">{renderGame()}</div>
        <button
          onClick={handleBack}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          style={{ width: '200px' }}
        >
          Back to Games
        </button>
      </div>
    </div>
  );
};

export default PuzzleGame;
