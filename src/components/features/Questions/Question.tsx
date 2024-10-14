import React, { useState } from 'react';
import AnswerOption from '../shared-components/AnswerOption';
import useScoreStore from '@/store/score';

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
          label={'A'} // Converts index to letter (A, B, C, D)
          text={optionA}
          onClick={() => handleAnswerClick("option_a")}
          isSelected={selectedAnswer === "option_a"} // Check if the option is selected
        />

        <AnswerOption 
          label={'B'} // Converts index to letter (A, B, C, D)
          text={optionB}
          onClick={() => handleAnswerClick("option_b")}
          isSelected={selectedAnswer === "option_b"} // Check if the option is selected
        />

        <AnswerOption 
          label={'C'} // Converts index to letter (A, B, C, D)
          text={optionC}
          onClick={() => handleAnswerClick("option_c")}
          isSelected={selectedAnswer === "option_c"} // Check if the option is selected
        />

        <AnswerOption 
          label={'D'} // Converts index to letter (A, B, C, D)
          text={optionD}
          onClick={() => handleAnswerClick("option_d")}
          isSelected={selectedAnswer === "option_d"} // Check if the option is selected
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
