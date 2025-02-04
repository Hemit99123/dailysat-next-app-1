import React, { useState, useRef, useEffect } from "react";
import AnswerOption from "../AnswerOption";
import Latex from "react-latex-next";
import { Answers } from "@/types/answer";
import {
  useAnswerCorrectStore,
  useAnswerStore,
  useQuestionStore,
} from "@/store/questions";
import {
  toggleCrossOffMode,
  toggleCrossOffOption,
} from "@/lib/questions-func/crossOff";
import { CalculatorIcon } from "lucide-react";
import { useCalcOptionModalStore } from "@/store/modals";
import CalcOption from "../../Modals/CalcOption";

interface MathQuestionProps {
  onAnswerSubmit: (selectedAnswer: string) => void;
}

const MathQuestion: React.FC<MathQuestionProps> = ({ onAnswerSubmit }) => {
  // Use zustand stores for question data and answer handling.
  const randomQuestion = useQuestionStore((state) => state.randomQuestion);
  const selectedAnswer = useAnswerStore((state) => state.answer);
  const setSelectedAnswer = useAnswerStore((state) => state.setAnswer);
  const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);

  // Local state for cross-off mode and crossed-off options.
  const [crossOffMode, setCrossOffMode] = useState(false);
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers> | null>(
    new Set()
  );

  const textRef = useRef<HTMLParagraphElement | null>(null);

  // Reset answer and crossed-off options when the answer becomes correct.
  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null);
      setCrossedOffOptions(null);
    }
  }, [isAnswerCorrect, setSelectedAnswer]);

  // --- Explanation extraction functions (new code) ---
  const extractImageUrls = (explanation: string) => {
    const urlRegex = /\[Image:\s*(https?:\/\/[^\]]+)\]/g;
    const urls: string[] = [];
    let match;
    while ((match = urlRegex.exec(explanation)) !== null) {
      urls.push(match[1]); // Push the URL found.
    }
    return urls;
  };

  const cleanExplanationText = (explanation: string) => {
    return explanation.replace(/\[Image:\s*https?:\/\/[^\]]+\]/g, "");
  };

  const imageUrls = randomQuestion
    ? extractImageUrls(randomQuestion.explanation)
    : [];
  const cleanedExplanation = randomQuestion
    ? cleanExplanationText(randomQuestion.explanation)
    : "";

  // --- Handlers ---
  const handleAnswerClick = (answer: Answers) => {
    if (crossOffMode) {
      toggleCrossOffOption(setCrossedOffOptions, answer);
    } else {
      setSelectedAnswer(answer);
    }
  };

  // Call the onAnswerSubmit prop if an answer is selected and then reset the selected answer.
  const handleSubmit = () => {
    if (!selectedAnswer) return;
    onAnswerSubmit(selectedAnswer);
    setSelectedAnswer(null);
  };

  const handleOpenCalcModal = useCalcOptionModalStore(
    (state) => state.openModal
  );

  if (!randomQuestion) {
    return <div>Loading...</div>;
  }

  // Build an object with answer options keyed by their letter.
  const options: Record<Answers, string> = {
    A: randomQuestion.optionA,
    B: randomQuestion.optionB,
    C: randomQuestion.optionC,
    D: randomQuestion.optionD,
  };

  return (
    <div className="flex flex-col items-start px-8 -mt-6">
      <div className="flex items-center mb-2 space-x-4">
        {/* Calculator Modal Button */}
        <button onClick={handleOpenCalcModal}>
          <CalculatorIcon />
        </button>
        {/* Cross-Off Mode Button */}
        <button
          onClick={() => toggleCrossOffMode(setCrossOffMode)}
          className={`p-1 rounded ${
            crossOffMode ? "bg-blue-300 text-white" : "bg-gray-300"
          }`}
        >
          Cross off
        </button>
      </div>

      {/* Question Text */}
      <p className="mb-5 text-xl relative" ref={textRef}>
        <Latex>{randomQuestion.question || ""}</Latex>
      </p>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        {Object.entries(options).map(([letter, text]) => (
          <AnswerOption
            key={letter}
            text={text}
            onClick={() => handleAnswerClick(letter as Answers)}
            isSelected={selectedAnswer === letter}
            isCrossedOff={crossedOffOptions?.has(letter as Answers) || false}
          />
        ))}
      </div>

      {/* Submit Answer Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!selectedAnswer}
      >
        Submit Answer
      </button>

      {/* Calculator Option Modal */}
      <CalcOption />

      {/* Explanation (if the answer is incorrect) */}
      {!isAnswerCorrect && randomQuestion && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h5 className="text-red-500">Incorrect!</h5>
          <p className="mt-2">{cleanedExplanation}</p>
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Explanation Visual ${idx}`}
              className="mt-2"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MathQuestion;
