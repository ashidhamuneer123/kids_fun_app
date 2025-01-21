// Quiz.jsx
import React, { useState } from 'react';
import QuizGame from './QuizGame';
import { quizData } from './quizData'; // Import the quiz data

const Quiz = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 'general_knowledge', name: 'General Knowledge' },
        { id: 'science', name: 'Science' },
        { id: 'sports', name: 'Sports' },
        { id: 'mathematics', name: 'Mathematics' },
        { id: 'computer', name: 'Computer' },
    ];

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    if (selectedCategory) {
        // Pass the selected category questions to the QuizGame component
        const questions = quizData[selectedCategory];
        return <QuizGame category={selectedCategory} questions={questions} />;
    }

    return (
        <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-green-500">Quiz Zone</h1>
            <p className="text-lg text-white mt-4">
                Get ready to test your knowledge with fun quizzes!
            </p>
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl font-bold">Choose a Category</h2>
                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            onClick={() => handleCategoryClick(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
