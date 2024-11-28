import React, { useState, useRef } from "react";
import AnswerOption from "../shared-components/AnswerOption";

interface QuestionProps {
  title: string;
  onAnswerSubmit: (answer: string) => void;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Highlight {
  text: string;
  startOffset: number;
  endOffset: number;
}

const Question: React.FC<QuestionProps> = ({
  title,
  optionA,
  optionB,
  optionC,
  optionD,
  onAnswerSubmit,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [mode, setMode] = useState<"highlight" | "clear" | null>(null); // Current mode
  const [crossOffMode, setCrossOffMode] = useState(false); // Cross-off mode
  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<string>>(
    new Set()
  ); // To track crossed off options
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // Toggle highlight/clear mode
  const toggleMode = (newMode: "highlight" | "clear") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
  };

  // Toggle cross-off mode
  const toggleCrossOffMode = () => {
    setCrossOffMode((prevMode) => !prevMode);
  };

  // Handle mouse selection
  const handleMouseUp = () => {
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
        } else if (mode === "clear") {
          removeHighlight(startOffset, endOffset);
        }
        selection.removeAllRanges(); // Clear selection
      }
    }
  };

  // Remove a highlight
  const removeHighlight = (start: number, end: number) => {
    setHighlights((prev) =>
      prev.filter(
        (highlight) =>
          highlight.endOffset <= start || highlight.startOffset >= end
      )
    );
  };

  // Check if text is highlighted
  const isTextHighlighted = (start: number, end: number) =>
    highlights.some(
      (highlight) =>
        highlight.startOffset <= start && highlight.endOffset >= end
    );

  // Render text with highlights
  const renderHighlightedText = () => {
    if (!textRef.current) return title;

    const nodes = [];
    let lastIndex = 0;

    for (const highlight of highlights) {
      if (highlight.startOffset > lastIndex) {
        nodes.push(
          <span key={lastIndex}>
            {title.slice(lastIndex, highlight.startOffset)}
          </span>
        );
      }
      nodes.push(
        <span
          key={highlight.startOffset}
          style={{ backgroundColor: "yellow", cursor: "pointer" }}
        >
          {title.slice(highlight.startOffset, highlight.endOffset)}
        </span>
      );
      lastIndex = highlight.endOffset;
    }

    if (lastIndex < title.length) {
      nodes.push(<span key={lastIndex}>{title.slice(lastIndex)}</span>);
    }

    return nodes;
  };

  // Handle answer click
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  // Handle answer submit
  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    }
  };

  // Handle cross-off button click for an option
  const handleCrossOff = (option: string) => {
    setCrossedOffOptions((prev) => {
      const updated = new Set(prev);
      if (updated.has(option)) {
        updated.delete(option); // Remove cross if it was previously crossed
      } else {
        updated.add(option); // Add cross
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col items-start px-8">
      <div className="flex items-center mb-2 space-x-4">
        {/* Highlight Mode Button */}
        <button
          onClick={() => toggleMode("highlight")}
          className={`p-1 rounded ${
            mode === "highlight" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          <img
            src={mode !== "highlight" ? "/highlighter.png" : "/full.png"}
            alt="Toggle highlight mode"
            className="w-4 h-4"
          />
        </button>

        {/* Clear Highlight Button */}
        <button
          onClick={() => toggleMode("clear")}
          className={`p-1 rounded ${
            mode === "clear" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          <img
            src={mode !== "clear" ? "/eraser.png" : "/colored.png"}
            alt="Toggle clear highlight mode"
            className="w-4 h-4"
          />
        </button>

        {/* Cross-Off Mode Button */}
        <button
          onClick={toggleCrossOffMode}
          className={`p-1 rounded ${
            crossOffMode ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          {crossOffMode ? "Disable Cross-off" : "Enable Cross-off"}
        </button>
      </div>

      <p
        className="mb-5 text-lg relative"
        ref={textRef}
        onMouseUp={handleMouseUp}
      >
        {renderHighlightedText()}
      </p>

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        {/* Option A */}
        <div className="relative">
          <AnswerOption
            label={"A"}
            text={optionA}
            onClick={() => handleAnswerClick("A")}
            isSelected={selectedAnswer === "A"}
          />
          {crossOffMode && (
            <button
              onClick={() => handleCrossOff("A")}
              className="absolute top-0 right-0 text-red-500"
            >
              {crossedOffOptions.has("A") ? "Remove Cross-off" : "✖"}
            </button>
          )}
          {crossedOffOptions.has("A") && (
            <span className="line-through text-gray-500">{optionA}</span>
          )}
        </div>

        {/* Option B */}
        <div className="relative">
          <AnswerOption
            label={"B"}
            text={optionB}
            onClick={() => handleAnswerClick("B")}
            isSelected={selectedAnswer === "B"}
          />
          {crossOffMode && (
            <button
              onClick={() => handleCrossOff("B")}
              className="absolute top-0 right-0 text-red-500"
            >
              {crossedOffOptions.has("B") ? "Remove Cross-off" : "✖"}
            </button>
          )}
          {crossedOffOptions.has("B") && (
            <span className="line-through text-gray-500">{optionB}</span>
          )}
        </div>

        {/* Option C */}
        <div className="relative">
          <AnswerOption
            label={"C"}
            text={optionC}
            onClick={() => handleAnswerClick("C")}
            isSelected={selectedAnswer === "C"}
          />
          {crossOffMode && (
            <button
              onClick={() => handleCrossOff("C")}
              className="absolute top-0 right-0 text-red-500"
            >
              {crossedOffOptions.has("C") ? "Remove Cross-off" : "✖"}
            </button>
          )}
          {crossedOffOptions.has("C") && (
            <span className="line-through text-gray-500">{optionC}</span>
          )}
        </div>

        {/* Option D */}
        <div className="relative">
          <AnswerOption
            label={"D"}
            text={optionD}
            onClick={() => handleAnswerClick("D")}
            isSelected={selectedAnswer === "D"}
          />
          {crossOffMode && (
            <button
              onClick={() => handleCrossOff("D")}
              className="absolute top-0 right-0 text-red-500"
            >
              {crossedOffOptions.has("D") ? "Remove Cross-off" : "✖"}
            </button>
          )}
          {crossedOffOptions.has("D") && (
            <span className="line-through text-gray-500">{optionD}</span>
          )}
        </div>
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

export default Question;
