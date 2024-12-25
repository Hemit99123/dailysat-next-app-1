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
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers>>(new Set()); // Track crossed-off options
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);
  const randomQuestion = useQuestionStore((state) => state.randomQuestion);

  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null);
      setCrossedOffOptions(new Set());
      setHighlights([]);
      setMode(null);
    }
  }, [isAnswerCorrect, setSelectedAnswer]);

  const toggleMode = (newMode: "highlight" | "clear") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
  };

  const handleSelection = (event: React.TouchEvent | React.MouseEvent) => {
    if (!mode || !textRef.current) return;

    event.preventDefault(); // Prevent accidental scroll
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
        selection.removeAllRanges();
      }
    }
  };

  const removeHighlight = (start: number, end: number) => {
    setHighlights((prev) =>
      prev.filter(
        (highlight) =>
          highlight.endOffset <= start || highlight.startOffset >= end
      )
    );
  };

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
          onClick={() => removeHighlight(highlight.startOffset, highlight.endOffset)}
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

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="flex flex-col items-start px-4 py-4 sm:px-8">
      <div className="flex items-center mb-4 space-x-4">
        <button
          onClick={() => toggleMode("highlight")}
          className={`p-2 rounded ${
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
            className="w-5 h-5"
            width={24}
            height={24}
          />
        </button>

        <button
          onClick={() => toggleMode("clear")}
          className={`p-2 rounded ${
            mode === "clear" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          <Image
            src={mode !== "clear" ? "/icons/eraser.png" : "/icons/colored.png"}
            alt="Toggle clear highlight mode"
            className="w-5 h-5"
            width={24}
            height={24}
          />
        </button>

        <button
          onClick={() => toggleCrossOffMode(setCrossOffMode)}
          className={`p-2 rounded ${
            crossOffMode ? "bg-blue-300 text-white" : "bg-gray-300"
          }`}
        >
          Cross Off
        </button>
      </div>

      <p
        className="text-xs font-extralight hover:text-red-500 cursor-pointer"
        onClick={() => betaBugReport()}
      >
        {randomQuestion?.id} Report this question as bugged
      </p>

      <p
        className="mb-5 text-xl relative"
        ref={textRef}
        onMouseUp={handleSelection}
        onTouchEnd={handleSelection}
      >
        {renderHighlightedText()}
      </p>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-3">
        <AnswerOption
          text={randomQuestion?.optionA || ""}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"}
          isCrossedOff={crossedOffOptions.has("A")}
        />

        <AnswerOption
          text={randomQuestion?.optionB || ""}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"}
          isCrossedOff={crossedOffOptions.has("B")}
        />

        <AnswerOption
          text={randomQuestion?.optionC || ""}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"}
          isCrossedOff={crossedOffOptions.has("C")}
        />

        <AnswerOption
          text={randomQuestion?.optionD || ""}
          onClick={() => handleAnswerClick("D")}
          isSelected={selectedAnswer === "D"}
          isCrossedOff={crossedOffOptions.has("D")}
        />
      </div>

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
