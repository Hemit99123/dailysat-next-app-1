import { QUESTION_IS_CORRECT_POINTS } from "@/data/CONSTANTS";
import { useAnswerCorrectStore } from "@/store/questions";
import React, { MutableRefObject, useState } from "react";
import Latex from "react-latex-next";

interface ResultProps {
    answerComponent: MutableRefObject<HTMLDivElement | null>;
    explanation: string | undefined;
}

const Result: React.FC<ResultProps> = ({
    answerComponent,
    explanation
}) => {

    const [openEditorial, setOpenEditorial] = useState(false)

    const handleToggleEditorial = () => {
        setOpenEditorial((prev) => !prev)
    }

    const isAnswerCorrect = useAnswerCorrectStore((state) => state.isAnswerCorrect);
    return (
        <div className="mt-4 pl-7 pb-10" ref={answerComponent}>
            {isAnswerCorrect !== "none" && (
                isAnswerCorrect ? (
                    <p className="text-green-500 text-lg font-semibold">
                        You are correct! + { QUESTION_IS_CORRECT_POINTS}
                    </p>
                ) : (
                    <div>
                        <p className="text-red-500 text-lg font-semibold">
                            You are wrong :(
                        </p>
                        <button
                            onClick={handleToggleEditorial}
                            className="text-blue-500 underline mt-2"
                        >
                            Do you want to see the editorials? Click here!
                        </button>
                        {openEditorial && explanation && (
                            <div className="mt-6">
                                <Latex >{explanation}</Latex>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Result;
