import React from "react"

interface ResultProps {
    isAnswerCorrect: boolean | null;
    handleToggleEditorial: () => void;
    openEditorial: boolean
    explanation: string | undefined;
}

const Result: React.FC<ResultProps> = ({isAnswerCorrect, handleToggleEditorial, openEditorial, explanation}) => {
    return (
        <>
            {isAnswerCorrect ? (
                <p className="text-green-500 text-lg font-semibold">
                    You are correct!
                </p>
                ) : (
                    <div>
                    <p className="text-red-500 text-lg font-semibold">
                    You are wrong :(
                    </p>
                    <button onClick={handleToggleEditorial}>
                        Do you want to see the editorials? Click here!
                    </button>
                    {openEditorial && (
                        <p className="mt-6">{explanation}</p>
                    )}
                    </div>
                  )}
        </>
    )
}

export default Result