import React, { useState, useRef, useEffect } from "react";
import AnswerOption from "../../shared-components/AnswerOption";
import { Answers } from "@/types/answer";
import { useAnswerCorrectStore, useAnswerStore, useQuestionStore } from "@/store/questions";
import Image from "next/image";
import axios from "axios";
import { Highlight } from "@/types/questions";
import { QuestionsProps } from "@/types/questions";
import { toggleCrossOffMode, toggleCrossOffOption } from "@/lib/crossOff";

const ReadingQuestion: React.FC<QuestionsProps> = ({ onAnswerSubmit }) => {
  const selectedAnswer = useAnswerStore((state) => state.answer);
  const setSelectedAnswer = useAnswerStore((state) => state.setAnswer);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [mode, setMode] = useState<"highlight" | "clear" | null>(null); // Current mode
  const [crossOffMode, setCrossOffMode] = useState(false); // Cross-off mode
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers> | null>(new Set()); // To track crossed-off options
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);
  const randomQuestion = useQuestionStore((state) => state.randomQuestion);

  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null);
      setCrossedOffOptions(null);
      setHighlights([]);
      setMode(null);
    }
  }, [isAnswerCorrect, setSelectedAnswer, setCrossedOffOptions, setHighlights, setMode]);

  // Toggle highlight/clear mode
  const toggleMode = (newMode: "highlight" | "clear") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
  };

  // Handle text selection for highlight/clear
  const handleSelection = () => {
    if (!mode || !textRef.current) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();

      if (selectedText.trim().length > 0) {
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;

        if (mode === "highlight") {
          setHighlights((prev) => [
            ...prev,
            { text: selectedText, startOffset, endOffset },
          ]);
        }
        selection.removeAllRanges(); // Clear selection
      }
    }
  };

  const handleTouchEnd = () => {
    handleSelection();
  };

  // Remove a specific highlight
  const removeHighlight = (start: number, end: number) => {
    setHighlights((prev) =>
      prev.filter(
        (highlight) =>
          highlight.endOffset <= start || highlight.startOffset >= end
      )
    );
  };

  // Render text with highlights, allowing click to erase highlights
  const renderHighlightedText = () => {
    if (!textRef.current) return randomQuestion?.question;

    const nodes = [];
    let lastIndex = 0;

    for (const highlight of highlights) {
      if (highlight.startOffset > lastIndex) {
        nodes.push(
          <span key={lastIndex}>
            {randomQuestion?.question.slice(lastIndex, highlight.startOffset)}
          </span>
        );
      }
      nodes.push(
        <span
          key={highlight.startOffset}
          style={{ backgroundColor: "yellow", cursor: "pointer" }}
          onClick={() => removeHighlight(highlight.startOffset, highlight.endOffset)} // Erase on click
        >
          {randomQuestion?.question.slice(highlight.startOffset, highlight.endOffset)}
        </span>
      );
      lastIndex = highlight.endOffset;
    }

    if (randomQuestion?.question && lastIndex < randomQuestion.question.length) {
      nodes.push(
        <span key={lastIndex}>
          {randomQuestion.question.slice(lastIndex)}
        </span>
      );
    }

    return nodes;
  };

  // Handle answer click
  const handleAnswerClick = (answer: Answers) => {
    if (crossOffMode) {
      toggleCrossOffOption(setCrossedOffOptions, answer);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const betaBugReport = async () => {
    await axios.get("/api/beta/bug?id=" + randomQuestion?.id);
    window.location.reload();
  };

  // Handle answer submit
  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="flex flex-col items-start px-8 -mt-6">
      <div className="flex items-center mb-2 space-x-4">
        {/* Highlight Mode Button */}
        <button
          onClick={() => toggleMode("highlight")}
          className={`p-1 rounded ${
            mode === "highlight" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          <Image
            src={
              mode !== "highlight"
                ? "/icons/highlighter.png"
                : "/icons/full.png"
            }
            alt="Toggle highlight mode"
            className="w-4 h-4"
            width={500}
            height={500}
          />
        </button>

        {/* Clear Highlight Button */}
        <button
          onClick={() => toggleMode("clear")}
          className={`p-1 rounded ${
            mode === "clear" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          <Image
            src={mode !== "clear" ? "/icons/eraser.png" : "/icons/colored.png"}
            alt="Toggle clear highlight mode"
            className="w-4 h-4"
            width={500}
            height={500}
          />
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
        {randomQuestion?.id} Report this question as bugged
      </p>

      <p
        className="mb-5 text-xl relative"
        ref={textRef}
        onMouseUp={handleSelection}
        onTouchEnd={handleTouchEnd}
      >
        {renderHighlightedText()}
      </p>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        <AnswerOption
          text={randomQuestion?.optionA || ""}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"}
          isCrossedOff={crossedOffOptions?.has("A")}
        />

        <AnswerOption
          text={randomQuestion?.optionB || ""}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"}
          isCrossedOff={crossedOffOptions?.has("B")}
        />

        <AnswerOption
          text={randomQuestion?.optionC || ""}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"}
          isCrossedOff={crossedOffOptions?.has("C")}
        />

        <AnswerOption
          text={randomQuestion?.optionD || ""}
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
    </div>
  );
};

export default ReadingQuestion;