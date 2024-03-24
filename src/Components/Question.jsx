import React from "react";

function Question({ questionNumber, question }) {
  return (
    <div className="mb-6 border-b border-b-white">
      <p className="text-xl font-semibold mb-2">{questionNumber} of 5</p>
      <h1 className="text-2xl font-semibold mb-4">{question}</h1>
    </div>
  );
}

export default Question;
