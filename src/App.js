import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import Options from "./Components/Options";
import Result from "./Components/Result";

function App() {
  const questions = [
    {
      id: 1,
      question:
        "Which of the following is NOT a valid way to create a React component?",
      options: [
        "Class Component",
        "Function Component",
        "Object Component",
        "Hooks",
      ],
      answer: "Object Component",
    },
    {
      id: 2,
      question: "What does JSX stand for in the context of React?",
      options: [
        "JavaScript XML",
        "JavaScript Extended",
        "Java Syntax Extension",
        "JSON XML",
      ],
      answer: "JavaScript XML",
    },
    {
      id: 3,
      question:
        "Which method is used to change the state in a React class component?",
      options: ["setState", "updateState", "changeState", "modifyState"],
      answer: "setState",
    },
    {
      id: 4,
      question: 'What does the "useEffect" hook do in React?',
      options: [
        "It performs side effects in function components",
        "It creates a new component",
        "It fetches data from an API",
        "It handles events in class components",
      ],
      answer: "It performs side effects in function components",
    },
    {
      id: 5,
      question: "Which of the following is a JavaScript ES6 feature?",
      options: [
        "var keyword",
        "Arrow functions",
        "Prototype-based inheritance",
        "Document Object Model (DOM)",
      ],
      answer: "Arrow functions",
    },
  ];
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const storedOptions = localStorage.getItem("selectedOptions");
    return storedOptions
      ? JSON.parse(storedOptions)
      : new Array(questions.length).fill(null);
  });
  const [timer, setTimer] = useState(20);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let interval;

    if (quizStarted && currentQuestion < questions.length) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          nextQuestion();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizStarted, currentQuestion, timer]);

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleAnswer = (selectedOption) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = selectedOption;
    setSelectedOptions(newSelectedOptions);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    nextQuestion();
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimer(20);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(20);
    } else {
      setQuizStarted(false);
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimer(20);
    }
  };

  const onRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOptions(new Array(questions.length).fill(null));
    setShowResult(false);
    localStorage.removeItem("selectedOptions");
  };

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto p-8  text-white min-h-screen">
        {!quizStarted && currentQuestion === 0 && !showResult ? (
          <div className="text-center border border-white rounded-lg w-fit mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome React & JavaScript Quiz
            </h1>
            <button
              className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
            <div className="flex justify-between mt-4">
              <p>5 Questions</p>
              <p>Timer :20 second P/Q</p>
            </div>
          </div>
        ) : (
          <>
            {currentQuestion < questions.length && !showResult ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Question
                    questionNumber={currentQuestion + 1}
                    question={questions[currentQuestion].question}
                  />
                  <p className="text-center">Time remaining: {timer} seconds</p>
                </div>
                <Options
                  options={questions[currentQuestion].options}
                  handleAnswer={handleAnswer}
                  selectedOption={selectedOptions[currentQuestion]}
                />
                <div className="flex justify-between mt-8">
                  <button
                    className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
                    onClick={prevQuestion}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <Result
                score={score}
                totalQuestions={questions.length}
                onRestart={onRestart}
              />
            )}
            <div className="text-center mt-8">
              <button
                className="bg-danger hover:bg-danger-dark text-white py-3 px-6 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
                onClick={onRestart}
              >
                Exit
              </button>
            </div>
          </>
        )}
        <p className="text-gray-400 mt-20 text-center">
          This ReactJS MCQ game app for the assignment of TheGoodGameTheory
        </p>
      </div>
    </div>
  );
}

export default App;
