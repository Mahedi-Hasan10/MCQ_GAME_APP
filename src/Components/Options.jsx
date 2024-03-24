import React from "react";

function Options({ options, handleAnswer, selectedOption }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out ${
            selectedOption === option
              ? "bg-primary text-white"
              : "bg-secondary text-black hover:bg-gray-200"
          }`}
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
