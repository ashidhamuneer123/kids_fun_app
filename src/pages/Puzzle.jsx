import React from 'react';
import { useNavigate } from 'react-router-dom';

const Puzzle = () => {
  const navigate = useNavigate();

  // List of games with unique IDs and names
  const games = [
    { id: 'tic-tac-toe', name: 'Tic Tac Toe' },
    { id: 'memory-game', name: 'Memory Game' },
    { id: 'jigsaw-puzzle', name: 'Jigsaw Puzzle' },
    { id: 'pokemon-puzzle', name: 'Pokemon Puzzle' },
  ];

  const handleGameClick = (gameId) => {
    navigate(`/puzzle-game/${gameId}`); // Navigate to the selected game
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-green-500">Puzzle Zone</h1>
      <p className="text-lg text-white mt-4">
        Solve puzzles and sharpen your mind!
      </p>

      {/* Game Selection Section */}
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">Choose a Puzzle Game</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
              style={{ width: '200px' }}
            >
              {game.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
