// import React, { useState, useRef, useEffect } from "react";
// import AnswerOption from "../AnswerOption";
// import { Answers } from "@/types/answer";
// import { useAnswerCorrectStore, useAnswerStore, useQuestionStore } from "@/store/questions";
// import { QuestionsProps } from "@/types/questions";
// import { toggleCrossOffMode, toggleCrossOffOption } from "@/lib/questions-func/crossOff";
// import { CalculatorIcon } from "lucide-react";
// import { useCalcOptionModalStore } from "@/store/modals";
// import CalcOption from "../../Modals/CalcOption";
// import Latex from "react-latex-next";

// const MathQuestion: React.FC<QuestionsProps> = ({
//   onAnswerSubmit,
// }) => {
//   const randomQuestion = useQuestionStore((state) => state.randomQuestion)
//   const selectedAnswer = useAnswerStore((state) => state.answer)
//   const setSelectedAnswer = useAnswerStore((state) => state.setAnswer)
//   const [crossOffMode, setCrossOffMode] = useState(false); // Cross-off mode
//   const [crossedOffOptions, setCrossedOffOptions] = useState<Set<Answers> | null>(
//     new Set()
//   ); // To track crossed off options
//   const textRef = useRef<HTMLParagraphElement | null>(null);
//   const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);

//   useEffect(() => {
//     if (isAnswerCorrect) {
//       setSelectedAnswer(null);
//       setCrossedOffOptions(null)
//     }
//   }, [isAnswerCorrect, setSelectedAnswer, setCrossedOffOptions]);

//   // Handle answer click
//   const handleAnswerClick = (answer: Answers) => {
//     if (crossOffMode) {
//       toggleCrossOffOption(setCrossedOffOptions, answer);
//     } else {
//       setSelectedAnswer(answer);
//     }
//   };

//   // const betaBugReport = async () => {
//   //   await axios.get("/api/beta/bug?id=" + randomQuestion?.id);
//   //   window.location.reload();
//   // };


//   // Handle answer submit
//   const handleSubmit = () => {
//     if (selectedAnswer) {
//       onAnswerSubmit(selectedAnswer);
//       setSelectedAnswer(null)
//     }
//   };

//   const handleOpenCalcModal = useCalcOptionModalStore((state) => state.openModal)

//   return (
//     <div className="flex flex-col items-start px-8 -mt-6">
//       <div className="flex items-center mb-2 space-x-4">
//         {/* Highlight Mode Button */}
//         <button onClick={handleOpenCalcModal}>
//           <CalculatorIcon />
//         </button>


//         {/* Cross-Off Mode Button */}
//         <button
//           onClick={() => toggleCrossOffMode(setCrossOffMode)}
//           className={`p-1 rounded ${crossOffMode ? "bg-blue-300 text-white" : "bg-gray-300"
//             }`}
//         >
//           Cross off
//         </button>
//       </div>

//       {/* Bug Report */}
//       {/* Bug, commenting for now, seems like we're not loading in questions from the DB */}
//       {/* <p
//         className="text-xs font-extralight hover:text-red-500 hover:cursor-pointer transition-all"
//         onClick={() => betaBugReport()}
//       >
//         {randomQuestion?.id} Report this question as bugged
//       </p> */}

//       <p
//         className="mb-5 text-xl relative"
//         ref={textRef}
//       >
//         <Latex>{randomQuestion?.question || ""}</Latex>

//       </p>

//       <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>
//       <div className="w-full space-y-2">
//         <AnswerOption
//           text={randomQuestion?.optionA || ""}
//           onClick={() => handleAnswerClick("A")}
//           isSelected={selectedAnswer === "A"}
//           isCrossedOff={crossedOffOptions?.has("A")}
//         />

//         <AnswerOption
//           text={randomQuestion?.optionB || ""}
//           onClick={() => handleAnswerClick("B")}
//           isSelected={selectedAnswer === "B"}
//           isCrossedOff={crossedOffOptions?.has("B")}
//         />

//         <AnswerOption
//           text={randomQuestion?.optionC || ""}
//           onClick={() => handleAnswerClick("C")}
//           isSelected={selectedAnswer === "C"}
//           isCrossedOff={crossedOffOptions?.has("C")}
//         />

//         <AnswerOption
//           text={randomQuestion?.optionC || ""}
//           onClick={() => handleAnswerClick("D")}
//           isSelected={selectedAnswer === "D"}
//           isCrossedOff={crossedOffOptions?.has("D")}
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         disabled={!selectedAnswer}
//       >
//         Submit Answer
//       </button>
//       <CalcOption />
//     </div>
//   );
// };

// export default MathQuestion;

import React, { useState, useRef } from "react";

import AnswerOption from "../AnswerOption";

import Latex from "react-latex-next";

import questions from "../QuestionModules/math_questions.json";

import { useCalcOptionModalStore } from "@/store/modals";

import { CalculatorIcon } from "lucide-react";

const MathQuestion: React.FC = () => {

  // Initialize with a random question

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.floor(Math.random() * questions.length));

  const mathQuestion = questions[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [showExplanation, setShowExplanation] = useState(false);

  const [crossOffMode, setCrossOffMode] = useState(false);

  const [crossedOffOptions, setCrossedOffOptions] = useState<Set<string>>(new Set());

  const textRef = useRef<HTMLParagraphElement | null>(null);

  // Function to extract image URLs from explanation text

  const extractImageUrls = (explanation: string) => {

    const urlRegex = /\[Image:\s*(https?:\/\/[^\]]+)\]/g;

    const urls: string[] = [];

    let match;

    // Find all matches of the regex pattern in the explanation string

    while ((match = urlRegex.exec(explanation)) !== null) {

      urls.push(match[1]); // Get the URL part of the match

    }

    return urls;

  };

  // Function to clean explanation text by removing [Image:] tags

  const cleanExplanationText = (explanation: string) => {

    return explanation.replace(/\[Image:\s*https?:\/\/[^\]]+\]/g, '');

  };

  const imageUrls = extractImageUrls(mathQuestion.explanation);

  const cleanedExplanation = cleanExplanationText(mathQuestion.explanation);

  // Handle answer click

  const handleAnswerClick = (answer: string) => {

    if (crossOffMode) {

      const newSet = new Set(crossedOffOptions);

      if (newSet.has(answer)) {

        newSet.delete(answer);

      } else {

        newSet.add(answer);

      }

      setCrossedOffOptions(newSet);

    } else {

      setSelectedAnswer(answer);

    }

  };

  // Handle answer submission

  const handleSubmit = () => {

    if (!selectedAnswer) return;

    if (selectedAnswer === mathQuestion.correct_answer) {

      console.log("Correct Answer!");

      setShowExplanation(false); // Reset explanation

      // Proceed to the next question

      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));

      setSelectedAnswer(null);

      setCrossedOffOptions(new Set()); // Reset crossed off options

    } else {

      console.log("Try Again!");

      setShowExplanation(true); // Show explanation on wrong answer

    }

  };

  const handleOpenCalcModal = useCalcOptionModalStore((state) => state.openModal);

  return (

    <div className="flex flex-col items-start px-8 -mt-6">

      <div className="flex items-center mb-2 space-x-4">

        {/* Highlight Mode Button */}

        <button onClick={handleOpenCalcModal}>

          <CalculatorIcon />

        </button>

        {/* Cross-Off Mode Button */}

        <button

          onClick={() => setCrossOffMode(!crossOffMode)}

          className={`p-1 rounded ${crossOffMode ? "bg-blue-300 text-white" : "bg-gray-300"}`}

        >

          Cross off

        </button>

      </div>

      {/* Question Text */}

      <h4>{mathQuestion.question_number}</h4>

      <p className="mb-5 text-xl relative" ref={textRef}>

        <Latex>{mathQuestion.question_text}</Latex>

      </p>

      {/* Answer Options */}

      <span className="mb-3 text-sm font-semibold">Choose 1 answer:</span>

      <div className="w-full space-y-2">

        {mathQuestion.choices.map((choice, index) => (

          <AnswerOption

            key={index}

            text={choice}

            onClick={() => handleAnswerClick(choice[0])} // Uses the first letter as the choice key

            isSelected={selectedAnswer === choice[0]}

            isCrossedOff={crossedOffOptions.has(choice[0])}

          />

        ))}

      </div>

      {/* Submit Button */}

      <button

        onClick={handleSubmit}

        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"

        disabled={!selectedAnswer}

      >

        Submit Answer

      </button>

      {/* Explanation */}

      {showExplanation && (

        <div className="mt-4 p-4 bg-gray-100 rounded">

          <h5 className="text-red-500">Incorrect!</h5>

          <p className="mt-2">{cleanedExplanation}</p>

          {imageUrls.map((url, idx) => (

            <img key={idx} src={url} alt={`Explanation Visual ${idx}`} className="mt-2" />

          ))}

        </div>

      )}

    </div>

  );

};

export default MathQuestion;