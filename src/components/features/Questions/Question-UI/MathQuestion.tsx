import React, { useState, useRef, useEffect } from "react";
import AnswerOption from "../../shared-components/AnswerOption";
import { Answers } from "@/types/answer";
import { useAnswerStore } from "@/store/answer";
import axios from "axios";
import { QuestionsProps } from "@/types/questions";
import { toggleCrossOffMode, toggleCrossOffOption } from "@/lib/crossOff";
import { CalculatorIcon } from "lucide-react";
import { useCalcOptionModalStore } from "@/store/modals";
import CalcOption from "../Modals/CalcOption";
import Latex from "react-latex-next";

const ReadingQuestion: React.FC<QuestionsProps> = ({
  title,
  optionA,
  optionB,
  optionC,
  optionD,
  id,
  onAnswerSubmit,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answers | null>(null);
  const [crossOffMode, setCrossOffMode] = useState(false); // Cross-off mode
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers> | null>(
    new Set()
  ); // To track crossed off options
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const isAnswerCorrect = useAnswerStore((state) => state.isAnswerCorrect);

  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null);
      setCrossedOffOptions(null)
    }
  }, [isAnswerCorrect]);

  // Handle answer click
  const handleAnswerClick = (answer: Answers) => {
    if (crossOffMode) {
      toggleCrossOffOption(setCrossedOffOptions, answer);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const betaBugReport = async () => {
    await axios.get("/api/beta/bug?id=" + id);
    window.location.reload();
  };


  // Handle answer submit
  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
      setSelectedAnswer(null)
    }
  };

  const handleOpenCalcModal = useCalcOptionModalStore((state) => state.openModal)

  return (
    <div className="flex flex-col items-start px-8 -mt-6">
      <div className="flex items-center mb-2 space-x-4">
        {/* Highlight Mode Button */}
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

      {/* Bug Report */}
      <p
        className="text-xs font-extralight hover:text-red-500 hover:cursor-pointer transition-all"
        onClick={() => betaBugReport()}
      >
        {id} Report this question as bugged
      </p>

      <p
        className="mb-5 text-xl relative"
        ref={textRef}
      >
        <Latex>{title}</Latex>
        
      </p>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        <AnswerOption
          text={optionA}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"}
          isCrossedOff={crossedOffOptions?.has("A")}
        />

        <AnswerOption
          text={optionB}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"}
          isCrossedOff={crossedOffOptions?.has("B")}
        />

        <AnswerOption
          text={optionC}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"}
          isCrossedOff={crossedOffOptions?.has("C")}
        />

        <AnswerOption
          text={optionD}
          onClick={() => handleAnswerClick("D")}
          isSelected={selectedAnswer === "D"}
          isCrossedOff={crossedOffOptions?.has("D")}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!selectedAnswer}
      >
        Submit Answer
      </button>
      <CalcOption />
    </div>
  );
};

export default ReadingQuestion;
