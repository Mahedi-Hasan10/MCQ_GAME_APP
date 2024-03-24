// Result.js
import React from "react";

const Result = ({ score, totalQuestions, onRestart }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  const ReturnHomepage = () => {
    onRestart();
    window.location.reload();
  };
  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white border border-white h-fit w-fit">
      <h1 className="text-3xl font-semibold mb-4">Quiz Result</h1>
      <p className="text-xl mb-4">
        Your score: {score}/{totalQuestions}
      </p>
      <p className="text-xl mb-4">Percentage: {percentage}%</p>
      <button
        className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
      <button
        className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out ml-4"
        onClick={ReturnHomepage}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Result;
