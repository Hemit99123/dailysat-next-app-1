"use client";

import Sidebar from "@/components/features/Sidebar/Sidebar";
import { readingTopics } from "@/data/topics";
import BookSVG from "@/components/features/Questions/icons/BookSVG";
import { Topic } from "@/types/topic";
import { useState, useEffect, useRef } from "react";
import ReadingQuestion from "@/components/features/Questions/Question-UI/ReadingQuestion";
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
import { useQuestionStore } from "@/store/questions";

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

const Reading = () => {
  const { fetchRandomQuestion, handleAnswerSubmit, handleCheckThreeStreak } = useQuestionHandler();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const randomQuestion = useQuestionStore((state) => state.randomQuestion);
  const correctCount = useAnswerCounterStore((state) => state.count);
  const answerCorrectRef: Record<Answers, number> = { A: 0, B: 1, C: 2, D: 3 };

  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const isAnnouncerModalOpen = useStreakAnnouncerModalStore((state) => state.isOpen);
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  const answerComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleCheckThreeStreak();
  }, [correctCount, handleCheckThreeStreak]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchRandomQuestion("Reading", topic);
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
    <div className="flex flex-col md:flex-row h-screen">
      {/* Replace Sidebar with the new Sidebar component */}
      <Sidebar
        title="Reading"
        svg={<BookSVG />}
        topics={readingTopics}
        selectedTopic={selectedTopic!}
        handleTopicClick={handleTopicClick}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-5 md:p-10">
        {selectedTopic ? (
          <div className="w-full mx-auto">
            <Header
              name={selectedTopic.name}
              question={randomQuestion?.question}
            />
            {randomQuestion ? (
              <ReadingQuestion
                onAnswerSubmit={() =>
                  handleAnswerSubmit(
                    "Reading",
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
      </div>

      {isAnnouncerModalOpen && <StreakAnnouncer />}
    </div>
  );
};

export default Reading;
