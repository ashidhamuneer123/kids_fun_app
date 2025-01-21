import React from 'react';
import { FaQuestionCircle, FaPuzzlePiece } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Home = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6 animate-bounce">
        Welcome to Kids' Fun Zone!
      </h1>
      <p className="text-xl text-white mb-8">
        A world of fun quizzes and puzzles awaits you!
      </p>
      <div className="flex justify-center gap-6">
        {/* Use Link to navigate to different routes */}
        <Link
          to="/quiz"
          className="bg-green-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition-all"
        >
          <FaQuestionCircle />
          Start Quiz
        </Link>
        <Link
          to="/puzzle"
          className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition-all"
        >
          <FaPuzzlePiece />
          Play Puzzles
        </Link>
      </div>
    </div>
  );
};

export default Home;
