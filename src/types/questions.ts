import { Answers } from "./answer";

// Shared between both components (props)

export interface QuestionsProps {
  onAnswerSubmit: (answer: Answers) => void;
}

// Types for READING question

export interface Highlight {
  text: string;
  startOffset: number;
  endOffset: number;
}

export interface QuestionData {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: number;
  explanation: string;
  skill: string;
}
