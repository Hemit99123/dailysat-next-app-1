import React, { useState, useRef, useEffect } from "react";
import AnswerOption from "../shared-components/AnswerOption";
import { Answers } from "@/types/answer";
import { useAnswerStore } from "@/store/answer";

interface QuestionProps {
  title: string;
  onAnswerSubmit: (answer: Answers) => void;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Highlight {
  text: string;
  annotation: string;
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
  const [selectedAnswer, setSelectedAnswer] = useState<Answers | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [mode, setMode] = useState<"highlight" | "clear" | null>(null); // Current mode
  const [annotationText, setAnnotationText] = useState("");
  const [currentSelection, setCurrentSelection] = useState<Highlight | null>(
    null
  );
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const isAnswerCorrect = useAnswerStore((state) => state.isAnswerCorrect)

  useEffect(() => {
    if (isAnswerCorrect) {
      setSelectedAnswer(null)
    }
  }, [isAnswerCorrect])

  // Toggle highlight/clear mode
  const toggleMode = (newMode: "highlight" | "clear") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
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
          setCurrentSelection({
            text: selectedText,
            annotation: "",
            startOffset,
            endOffset,
          });
          selection.removeAllRanges(); // Clear selection
        } else if (mode === "clear") {
          removeHighlight(startOffset, endOffset);
          selection.removeAllRanges(); // Clear selection
        }
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

  // Submit an annotation for the current highlight
  const handleAnnotationSubmit = () => {
    if (currentSelection) {
      const newHighlight = { ...currentSelection, annotation: annotationText };
      setHighlights((prev) => [...prev, newHighlight]);
      setAnnotationText("");
      setCurrentSelection(null);
    }
  };

  // Check if text is highlighted

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
          title={highlight.annotation} // Tooltip for hover
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
  const handleAnswerClick = (answer: Answers) => {
    setSelectedAnswer(answer);
  };

  // Handle answer submit
  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    }
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
      </div>

      <p
        className="mb-5 text-lg relative"
        ref={textRef}
        onMouseUp={handleMouseUp}
      >
        {renderHighlightedText()}
      </p>

      {/* Annotation Popup */}
      {currentSelection && mode === "highlight" && (
        <div className="absolute bg-white border p-2 rounded shadow">
          <textarea
            className="border p-1 w-full"
            placeholder="Add an annotation"
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
          />
          <button
            onClick={handleAnnotationSubmit}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Annotation
          </button>
        </div>
      )}

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        <AnswerOption
          text={optionA}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"}
        />

        <AnswerOption
          text={optionB}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"}
        />

        <AnswerOption
          text={optionC}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"}
        />

        <AnswerOption
          text={optionD}
          onClick={() => handleAnswerClick("D")}
          isSelected={selectedAnswer === "D"}
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

export default Question;
