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
  const [disappearedCards, setDisappearedCards] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer state
  const [gameStarted, setGameStarted] = useState(false); // To track if game has started

  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']; // Expanded card values for 6x2 grid
  const initialCards = [...cardValues, ...cardValues]; // Duplicate for pairs

  // Shuffle and initialize cards when the game starts
  useEffect(() => {
    const shuffledCards = shuffleArray(initialCards);
    setCards(shuffledCards);
  }, []);

  // Timer function
  useEffect(() => {
    let interval;
    if (gameStarted && matchedPairs < cardValues.length) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000); // Increment every second
    } else {
      clearInterval(interval); // Stop timer if the game is finished
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [gameStarted, matchedPairs]);

  // Handle card flip
  const handleCardClick = (index) => {
    if (!gameStarted) setGameStarted(true); // Start the game when the first card is flipped
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || disappearedCards.includes(index)) return; // Avoid flipping more than two cards at once or already disappeared cards

    setFlippedIndices((prevIndices) => [...prevIndices, index]);

    // If two cards are flipped, check if they match
    if (flippedIndices.length === 1) {
      const firstCard = cards[flippedIndices[0]];
      const secondCard = cards[index];

      if (firstCard === secondCard) {
        setMatchedPairs((prev) => prev + 1); // Increment matched pairs
        setDisappearedCards((prev) => [...prev, flippedIndices[0], index]); // Mark matched cards as disappeared
      }

      // Reset flippedIndices after a short delay
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matchedPairs === cardValues.length) {
      alert(`Congratulations! You won the game in ${timeElapsed} seconds!`);
    }
  }, [matchedPairs, timeElapsed]);

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Memory Game</h1>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 max-w-xs sm:max-w-md mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer
              ${flippedIndices.includes(index) || disappearedCards.includes(index) ? 'bg-white' : 'bg-gray-300'}`}
            onClick={() => handleCardClick(index)}
          >
            {(flippedIndices.includes(index) || disappearedCards.includes(index)) && (
              <span className="text-lg sm:text-xl font-bold text-black">{card}</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-lg text-teal-600">Matched Pairs: {matchedPairs} / {cardValues.length}</p>
      
      {/* Display Time */}
      <p className="mt-4 text-xl text-teal-600">Time Taken: {timeElapsed} seconds</p>
    </div>
  );
};

export default MemoryGame;
