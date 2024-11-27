import React, { useState } from 'react';
import AnswerOption from '../shared-components/AnswerOption';

interface QuestionProps {
  title: string;
  onAnswerSubmit: (answer: string) => void;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

const Question: React.FC<QuestionProps> = ({ title, optionA, optionB, optionC, optionD, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    }
  };



  return (
    <div className="flex flex-col items-start px-8">
      <p className="mb-5 text-lg">{title}</p>
      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        <AnswerOption 
          text={optionA}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"} // Check if the option is selected
        />

        <AnswerOption 
          text={optionB}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"} // Check if the option is selected
        />

        <AnswerOption 
          text={optionC}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"} // Check if the option is selected
        />

        <AnswerOption 
          text={optionD}
          onClick={() => handleAnswerClick("D")}
          isSelected={selectedAnswer === "D"} // Check if the option is selected
        />
  
      </div>
      <button 
        onClick={handleSubmit} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!selectedAnswer} // Disable if no answer is selected
      >
        Submit Answer
      </button>
    </div>
  );
};

export default Question;
