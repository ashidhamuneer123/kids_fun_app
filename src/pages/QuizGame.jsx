import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizGame = ({ category, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, 10));
  }, [questions]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Update the answer status (showing the selected answer and the correct answer)
    setAnswerStatus({
      selectedAnswer,
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
    });

    // If the answer is correct, increase the score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswerStatus(null); // Reset answer status for next question
      }, 1000); // Wait for a second before switching to the next question
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setAnswerStatus(null);
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, 10)); // Restart the quiz with shuffled questions
  };

  if (shuffledQuestions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="quiz-game p-8 flex justify-center items-center min-h-screen bg-black relative">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-600">{category} Quiz</h2>
        {!quizFinished ? (
          <div className="question-section mt-8">
            <h3 className="text-xl text-center text-gray-800 font-semibold">{currentQuestion.question}</h3>
            <div className="space-y-4 mt-6">
              {currentQuestion.options.map((option, index) => {
                // Determine the classes based on the answer status
                let buttonClass = 'bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition-all w-full';

                if (answerStatus) {
                  if (answerStatus.selectedAnswer === option) {
                    buttonClass = answerStatus.isCorrect
                      ? 'bg-green-500 text-white py-3 px-6 rounded-lg transition-all w-full'
                      : 'bg-red-500 text-white py-3 px-6 rounded-lg transition-all w-full';
                  } else if (answerStatus.correctAnswer === option) {
                    buttonClass = 'bg-green-500 text-white py-3 px-6 rounded-lg transition-all w-full';
                  }
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswer(option)}
                    disabled={answerStatus !== null} // Disable button after an answer is clicked
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Score */}
            <div className="mt-6 text-center">
              <p className="font-medium text-lg text-gray-700">Score: {score}</p>
              <p className="text-gray-500">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</p>
            </div>
          </div>
        ) : (
          <div className="final-result text-center mt-8">
            <h3 className="text-3xl font-bold text-green-600">Quiz Finished!</h3>
            <p className="mt-4 text-xl font-semibold">Your score: {score} out of {shuffledQuestions.length}</p>
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
                onClick={restartQuiz} // Call restartQuiz instead of window.location.reload
              >
                Restart Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
