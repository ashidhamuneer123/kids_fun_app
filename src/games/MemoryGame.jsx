import React, { useState, useEffect } from 'react';

// Helper function to shuffle cards
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false); // State to handle game win

  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const initialCards = [...cardValues, ...cardValues];

  useEffect(() => {
    const shuffledCards = shuffleArray(initialCards);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  const handleCardClick = (index) => {
    if (!gameStarted) setGameStarted(true);
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;

    setFlippedIndices((prevIndices) => [...prevIndices, index]);

    if (flippedIndices.length === 1) {
      const firstCard = cards[flippedIndices[0]];
      const secondCard = cards[index];

      if (firstCard === secondCard) {
        setMatchedPairs((prev) => prev + 1);
        setMatchedIndices((prev) => [...prev, flippedIndices[0], index]);
      }

      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchedPairs === cardValues.length) {
      setGameWon(true); // Trigger game win modal
    }
  }, [matchedPairs]);

  const resetGame = () => {
    setMatchedPairs(0);
    setMatchedIndices([]);
    setFlippedIndices([]);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameWon(false);
    setCards(shuffleArray(initialCards)); // Reset and shuffle cards
  };

  // Helper function to format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 0 ? `${mins} minute${mins > 1 ? 's' : ''} ` : ''}${secs} second${secs !== 1 ? 's' : ''}`;
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Memory Game</h1>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 max-w-xs sm:max-w-md mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center cursor-pointer
              ${matchedIndices.includes(index) ? 'bg-green-500' : flippedIndices.includes(index) ? 'bg-gray-300' : 'bg-gray-500'}`}
            onClick={() => handleCardClick(index)}
          >
            {(flippedIndices.includes(index) || matchedIndices.includes(index)) && (
              <span className="text-lg sm:text-xl font-bold text-black">{card}</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-lg text-teal-600">Matched Pairs: {matchedPairs} / {cardValues.length}</p>
      <p className="mt-4 text-xl text-teal-600">Time Taken: {formatTime(timeElapsed)}</p>

      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-lg mb-4">
              You completed the game in <strong>{formatTime(timeElapsed)}</strong>!
            </p>
            <button
              onClick={resetGame}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
