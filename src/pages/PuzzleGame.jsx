import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const PuzzleGame = () => {
  const { category, puzzleName } = useParams(); // Retrieve category and puzzle from URL params
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate('/puzzle'); // Navigate back to the puzzle categories page
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-blue-500">{category} - {puzzleName}</h1>
      <p className="text-lg text-white mt-4">
        Game content for {puzzleName} goes here.
      </p>

      {/* Add puzzle game logic here */}
      <div className="mt-6">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Back to Puzzles
        </button>
      </div>
    </div>
  );
};

export default PuzzleGame;
