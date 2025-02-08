import React, { useState, useEffect } from "react";
import { CalculatorIcon } from "lucide-react";
import data from "../QuestionModules/cb-digital-questions.json";

interface MathQuestionProp {
  onAnswerSubmit: (isCorrect: boolean) => void;
}

const MathQuestion: React.FC<MathQuestionProp> = ({ onAnswerSubmit }) => {
  // State management
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [crossOffMode, setCrossOffMode] = useState(false);
  const [crossedOffOptions, setCrossedOffOptions] = useState(new Set());
  const [showExplanation, setShowExplanation] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Get all multiple choice questions
  const getMultipleChoiceQuestions = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.entries(data).filter(([_, question]) => 
      question.content?.answer?.style === "Multiple Choice"
    );
  };

  // Get a random question
  const getRandomQuestion = (): string => {
    const multipleChoiceQuestions = getMultipleChoiceQuestions();
    // if (multipleChoiceQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * multipleChoiceQuestions.length);
    return multipleChoiceQuestions[randomIndex][0]; // Return the question ID
  };

  // Initialize first question
  useEffect(() => {
    if (!currentQuestionId) {
      setCurrentQuestionId(getRandomQuestion());
    }
  }, []);

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setCrossedOffOptions(new Set());
    setShowExplanation(false);
    setAnsweredCorrectly(false);
  }, [currentQuestionId]);

  // Handle answer selection, change type later for answer
  const handleAnswerClick = (answer: string) => {
    if (crossOffMode) {
      const newCrossedOff = new Set(crossedOffOptions);
      if (newCrossedOff.has(answer)) {
        newCrossedOff.delete(answer);
      } else {
        newCrossedOff.add(answer);
      }
      setCrossedOffOptions(newCrossedOff);
    } else if (!showExplanation) {
      setSelectedAnswer(answer);
    }
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    const currentQuestion = data[currentQuestionId];
    const isCorrect = selectedAnswer === currentQuestion.content.answer.correct_choice;
    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    onAnswerSubmit?.(isCorrect);
  };

  // Handle next question
  const handleNextQuestion = () => {
    setCurrentQuestionId(getRandomQuestion());
  };

  if (!currentQuestionId || !data[currentQuestionId]) {
    return <div>Loading...</div>;
  }

  const currentQuestion = data[currentQuestionId];

  return (
    <div className="flex flex-col items-start px-8 -mt-6">
      {/* Tools */}
      <div className="flex items-center mb-2 space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <CalculatorIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCrossOffMode(!crossOffMode)}
          className={`p-2 rounded ${
            crossOffMode ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Cross off
        </button>
      </div>

      {/* Question Info */}
      <div className="w-full mb-4 text-sm text-gray-600">
        <span>Difficulty: {currentQuestion.difficulty}</span>
        <span className="mx-2">|</span>
        <span>Topic: {currentQuestion.primary_class_cd_desc}</span>
      </div>

      {/* Question Text */}
      <div 
        className="mb-5 text-xl"
        dangerouslySetInnerHTML={{ __html: currentQuestion.content.prompt }}
      />

      {/* Answer Options */}
      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        {Object.entries(currentQuestion.content.answer.choices).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleAnswerClick(key)}
            className={`w-full p-4 text-left rounded border ${
              showExplanation && key === currentQuestion.content.answer.correct_choice
                ? 'border-green-500 bg-green-50'
                : showExplanation && key === selectedAnswer
                ? 'border-red-500 bg-red-50'
                : selectedAnswer === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${crossedOffOptions.has(key) ? 'line-through opacity-50' : ''}`}
          >
            <span className="font-semibold mr-2">{key.toUpperCase()}.</span>
            <span dangerouslySetInnerHTML={{ __html: value.body }} />
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="w-full mt-4 p-4 rounded bg-gray-100">
          <div dangerouslySetInnerHTML={{ __html: currentQuestion.content.answer.rationale }} />
        </div>
      )}

      {/* Action Button */}
      {!showExplanation ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`mt-4 px-6 py-2 rounded text-white ${
            selectedAnswer 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="mt-4 px-6 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default MathQuestion;