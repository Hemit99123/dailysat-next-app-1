"use client"

import Sidebar from "@/components/features/Sidebar/Sidebar";
import { mathTopics } from '@/data/topics'; 
import MathSVG from "@/components/features/Questions/icons/MathSVG";
import { Topic } from "@/types/sat-platform/topic";
import { useEffect, useRef } from "react";
import MathQuestion from "@/components/features/Questions/Question-UI/QuestionModules/MathQuestion";
import Header from "@/components/features/Questions/Question-UI/Header";
import ScoreModal from "@/components/features/Questions/Modals/ScoreModal";
import StreakModal from "@/components/features/Questions/Modals/StreakModal";
import { Answers } from "@/types/sat-platform/answer";
import { useScoreModalStore, useStreakCounterModalStore } from "@/store/modals";
import StreakAnnouncer from "@/components/features/Questions/Modals/StreakAnnouncer";
import useQuestionHandler from "@/hooks/questions";
import Spinner from "@/components/common/Spinner";
import GetStarted from "@/components/features/Questions/Question-UI/GetStarted";
import Result from "@/components/features/Questions/Question-UI/Results";
import { useQuestionStore, useTopicStore } from "@/store/questions";
import QuestionWrappers from "@/components/wrappers/question/Question";
import MainWrappers from "@/components/wrappers/question/Main";

const Math = () => {
  const {fetchRandomQuestion, handleAnswerSubmit, handleCheckThreeStreak} = useQuestionHandler()
  const selectedTopic = useTopicStore((state) => state.selectedTopic)
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic)
  const randomQuestion = useQuestionStore((state) => state.randomQuestion)
  const setRandomQuestion = useQuestionStore((state) => state.setRandomQuestion)

  const answerCorrectRef: Record<Answers, number> = { A: 0, B: 1, C: 2, D: 3 };

  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  const answerComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRandomQuestion(null)
    setSelectedTopic(null)
  }, [setRandomQuestion, setSelectedTopic])

  useEffect(() => {
    handleCheckThreeStreak()
  }, [handleCheckThreeStreak]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchRandomQuestion("Math", topic);
  };


  if (isScoreModalOpen || isStreakModalOpen) {
    return (
      <>
        <ScoreModal />
        <StreakModal />
      </>
    );
  }

  return (
    <MainWrappers>
      <Sidebar
        title="Math"
        svg={<MathSVG />}
        topics={mathTopics}
        handleTopicClick={handleTopicClick}
      />

      {/* Main Content */}
      <QuestionWrappers>
        <span className="font-bold text-lg border-2 border-black rounded-lg lg:w-1/5 text-center cursor-pointer hover:bg-black hover:text-white duration-500 mb-10">
          ✨ Experimental ✨
        </span>
        {selectedTopic ? (
          <div className="w-full mx-auto">

            <Header
                name={selectedTopic.name}
                question={randomQuestion?.question}
            />
            {randomQuestion ? (
              <MathQuestion
                onAnswerSubmit={() => 
                  handleAnswerSubmit( 
                    "Math",
                    randomQuestion.correctAnswer, 
                    answerCorrectRef
                  )
                }
              />
            ) : (
              <Spinner />
            )}
              <Result 
                answerComponent={answerComponent}
                explanation={randomQuestion?.explanation || ""}
              />
          </div>
        ) : (
          <GetStarted />
        )}
      </QuestionWrappers>

      <StreakAnnouncer />
    </MainWrappers>
  );
};

export default Math;