import React, { useState, useRef, useEffect } from "react";
import AnswerOption from "../../shared-components/AnswerOption";
import { Answers } from "@/types/answer";
import { useAnswerCorrectStore, useAnswerStore, useQuestionStore } from "@/store/questions";
import Image from "next/image";
import axios from "axios";
import { QuestionsProps } from "@/types/questions";
import { toggleCrossOffMode, toggleCrossOffOption } from "@/lib/crossOff";

const ReadingQuestion: React.FC<QuestionsProps> = ({ onAnswerSubmit }) => {
  const selectedAnswer = useAnswerStore((state) => state.answer);
  const setSelectedAnswer = useAnswerStore((state) => state.setAnswer);
  const [mode, setMode] = useState<"highlight" | "erase" | null>(null);
  const [crossOffMode, setCrossOffMode] = useState(false);
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers>>(new Set());
  const textRef = useRef<HTMLDivElement | null>(null);
  const isMouseDown = useRef(false);

  const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);
  const randomQuestion = useQuestionStore((state) => state.randomQuestion);

  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null);
      setCrossedOffOptions(new Set());
      clearAllHighlights();
      setMode(null);
    }
  }, [isAnswerCorrect]);

  // Start highlighting/erasing
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mode || !textRef.current) return;

    isMouseDown.current = true;
    applyHighlightOrErase(e);
  };

  // Continue highlighting/erasing
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mode || !isMouseDown.current || !textRef.current) return;

    applyHighlightOrErase(e);
  };

  // End highlighting/erasing
  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const applyHighlightOrErase = (e: React.MouseEvent | React.TouchEvent) => {
    if (!textRef.current) return;

    const elementUnderCursor = document.elementFromPoint(
      e.type.includes("touch")
        ? (e as React.TouchEvent).touches[0].clientX
        : (e as React.MouseEvent).clientX,
      e.type.includes("touch")
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY
    );

    if (elementUnderCursor && textRef.current.contains(elementUnderCursor)) {
      if (mode === "highlight") {
        elementUnderCursor.classList.add("highlight");
      } else if (mode === "erase") {
        elementUnderCursor.classList.remove("highlight");
      }
    }
  };

  const clearAllHighlights = () => {
    if (!textRef.current) return;
    const highlightedSpans = textRef.current.querySelectorAll(".highlight");
    highlightedSpans.forEach((span) => span.classList.remove("highlight"));
  };

  const toggleMode = (newMode: "highlight" | "erase") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
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
    <div className="flex flex-col items-start px-8 -mt-6">
      <div className="flex items-center mb-2 space-x-4">
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
        <button
          onClick={() => toggleMode("erase")}
          className={`p-1 rounded ${
            mode === "erase" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          <Image
            src={mode !== "erase" ? "/icons/eraser.png" : "/icons/colored.png"}
            alt="Toggle erase mode"
            className="w-4 h-4"
            width={500}
            height={500}
          />
        </button>
        <button
          onClick={() => toggleCrossOffMode(setCrossOffMode)}
          className={`p-1 rounded ${
            crossOffMode ? "bg-blue-300 text-white" : "bg-gray-300"
          }`}
        >
          Cross off
        </button>
      </div>

      <p
        className="text-xs font-extralight hover:text-red-500 hover:cursor-pointer transition-all"
        onClick={() => betaBugReport()}
      >
        {randomQuestion?.id} Report this question as bugged
      </p>

      <div
        ref={textRef}
        className="relative text-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: mode ? "crosshair" : "default", userSelect: "none" }}
      >
        {randomQuestion?.question.split("").map((char, index) => (
          <span key={index} className="inline-block">
            {char}
          </span>
        ))}
      </div>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
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