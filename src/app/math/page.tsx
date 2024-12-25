"use client"

import Sidebar from "@/components/features/Sidebar/Sidebar";
import { mathTopics } from '@/data/topics'; 
import MathSVG from "@/components/features/Questions/icons/MathSVG";
import { Topic } from "@/types/topic";
import { useEffect, useRef } from "react";
import MathQuestion from "@/components/features/Questions/Question-UI/MathQuestion";
import Header from "@/components/features/Questions/Header";
import { useAnswerCounterStore } from "@/store/score";
import ScoreModal from "@/components/features/Questions/Modals/ScoreModal";
import StreakModal from "@/components/features/Questions/Modals/StreakModal";
import { Answers } from "@/types/answer";
import { useScoreModalStore, useStreakAnnouncerModalStore, useStreakCounterModalStore } from "@/store/modals";
import StreakAnnouncer from "@/components/features/Questions/Modals/StreakAnnouncer";
import useQuestionHandler from "@/hooks/questions";
import Spinner from "@/components/common/Spinner";
import GetStarted from "@/components/features/Questions/GetStarted";
import Result from "@/components/features/Questions/Results";
import { useQuestionStore, useTopicStore } from "@/store/questions";
import QuestionWrappers from "@/components/wrappers/question/Question";
import MainWrappers from "@/components/wrappers/question/Main";

const Math = () => {
  const {fetchRandomQuestion, handleAnswerSubmit, handleCheckThreeStreak} = useQuestionHandler()
  const selectedTopic = useTopicStore((state) => state.selectedTopic)
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic)
  const randomQuestion = useQuestionStore((state) => state.randomQuestion)
  const correctCount = useAnswerCounterStore((state) => state.count)
  const answerCorrectRef: Record<Answers, number> = { A: 0, B: 1, C: 2, D: 3 };

  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const isAnnouncerModalOpen = useStreakAnnouncerModalStore((state) => state.isOpen);
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  const answerComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleCheckThreeStreak()
  }, [correctCount, handleCheckThreeStreak]);

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
        <span className="font-bold text-lg border-2 border-black rounded-lg w-1/5 text-center cursor-pointer hover:bg-black hover:text-white duration-500">
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

      {isAnnouncerModalOpen && <StreakAnnouncer />}
    </MainWrappers>
  );
};

export default Math;
