import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const Puzzle = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = [
    { id: 'math', name: 'Math Puzzles' },
    { id: 'word', name: 'Word Puzzles' },
    { id: 'logic', name: 'Logic Puzzles' },
    { id: 'picture', name: 'Picture Puzzles' },
  ];

  const puzzleData = {
    math: ['Puzzle 1', 'Puzzle 2', 'Puzzle 3'],
    word: ['Word Puzzle 1', 'Word Puzzle 2'],
    logic: ['Logic Puzzle 1', 'Logic Puzzle 2', 'Logic Puzzle 3'],
    picture: ['Picture Puzzle 1', 'Picture Puzzle 2'],
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePuzzleClick = (puzzleName) => {
    // Navigate to PuzzleGame with selected puzzle
    navigate(`/puzzle-game/${selectedCategory}/${puzzleName}`); // Use navigate instead of history.push
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-green-500">Puzzle Zone</h1>
      <p className="text-lg text-white mt-4">
        Solve puzzles and sharpen your mind!
      </p>

      {/* Category Selection Section */}
      {!selectedCategory ? (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Choose a Puzzle Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Display puzzles based on selected category
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-6 mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 capitalize">
            {selectedCategory} Puzzles
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {puzzleData[selectedCategory]?.map((puzzle, index) => (
              <div
                key={index}
                onClick={() => handlePuzzleClick(puzzle)}
                className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-sm text-gray-800 hover:bg-gray-200 transition-all"
              >
                {puzzle}
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
