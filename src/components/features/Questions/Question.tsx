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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [mode, setMode] = useState<"highlight" | "clear" | null>(null);
  const [annotationText, setAnnotationText] = useState("");
  const [currentSelection, setCurrentSelection] = useState<Highlight | null>(
    null
  );
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // Toggle between highlight and clear modes
  const toggleMode = (newMode: "highlight" | "clear") => {
    setMode((prevMode) => (prevMode === newMode ? null : newMode));
  };

  // Handle text selection for highlighting or clearing
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

  // Remove an existing highlight
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

  // Render text with highlights applied
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
          title={highlight.annotation}
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
      <div className="flex items-center mb-4 space-x-4">
        {/* Highlight Mode Button */}
        <button onClick={() => toggleMode("highlight")}>
          <img
            src={mode !== "highlight" ? "/highlighter.png" : "/full.png"}
            alt="Toggle highlight mode"
            className="w-6 h-6"
          />
        </button>

        {/* Clear Highlight Button */}
        <button onClick={() => toggleMode("clear")}>
          <img
            src={mode !== "clear" ? "/eraser.png" : "/colored.png"}
            alt="Toggle clear highlight mode"
            className="w-6 h-6"
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
        <div
          className="absolute bg-white border p-2 rounded shadow"
          style={{
            position: "absolute",
            top: `${
              window?.getSelection()?.getRangeAt(0)?.getBoundingClientRect()?.top +
              window?.scrollY -
              50
            }px`,
            left: `${
              window.getSelection()?.getRangeAt(0).getBoundingClientRect().left
            }px`,
            zIndex: 10,
          }}
        >
          <textarea
            className="border p-1 w-full text-sm"
            placeholder="Annotation"
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            style={{ height: "60px" }}
          />
          <button
            onClick={handleAnnotationSubmit}
            className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
      <div className="w-full space-y-2">
        <AnswerOption
          label={"A"}
          text={optionA}
          onClick={() => handleAnswerClick("A")}
          isSelected={selectedAnswer === "A"}
        />

        <AnswerOption
          label={"B"}
          text={optionB}
          onClick={() => handleAnswerClick("B")}
          isSelected={selectedAnswer === "B"}
        />

        <AnswerOption
          label={"C"}
          text={optionC}
          onClick={() => handleAnswerClick("C")}
          isSelected={selectedAnswer === "C"}
        />

        <AnswerOption
          label={"D"}
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
