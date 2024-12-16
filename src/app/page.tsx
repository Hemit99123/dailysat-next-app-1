"use client"

import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/features/Questions/Header";
import Question from "@/components/features/Questions/Question";
import { useAnswerCounterStore, useScoreStore } from "@/store/score";
import ScoreModal from "@/components/features/Questions/Modals/ScoreModal";
import BookSVG from "@/components/features/Questions/icons/BookSVG";
import {
  useScoreModalStore,
  useStreakAnnouncerModalStore,
  useStreakCounterModalStore,
} from "@/store/modals";
import StreakAnnouncer from "@/components/features/Questions/Modals/StreakAnnouncer";
import StreakModal from "@/components/features/Questions/Modals/StreakModal";
import { Answers } from "@/types/answer";
import { useAnswerStore } from "@/store/answer";
import { Topic } from "@/types/topic";
import Sidebar from "@/components/features/Sidebar/Sidebar"; // Import Sidebar

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

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<QuestionData | null>(null);
  const isAnswerCorrect = useAnswerStore((state) => state.isAnswerCorrect);
  const setIsAnswerCorrect = useAnswerStore(
    (state) => state.setIsAnswerCorrect
  );
  const [openEditorial, setOpenEditorial] = useState<boolean>(false);

  const increaseScore = useScoreStore((state) => state.increaseScore);
  const increaseCorrectCounter = useAnswerCounterStore(
    (state) => state.increaseCount
  );
  const resetCorrectCounter = useAnswerCounterStore(
    (state) => state.resetCount
  );
  const correctCount = useAnswerCounterStore((state) => state.count);

  const openScoreModal = useScoreModalStore((state) => state.openModal);
  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const openAnnouncerModal = useStreakAnnouncerModalStore(
    (state) => state.openModal
  );
  const isAnnouncerModalOpen = useStreakAnnouncerModalStore(
    (state) => state.isOpen
  );
  const openStreakModal = useStreakCounterModalStore(
    (state) => state.openModal
  );
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  const answerComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (correctCount === 3) {
      openAnnouncerModal();
    }

    if (correctCount === 7) {
      openAnnouncerModal();
    }
  }, [correctCount, openAnnouncerModal]);

  const topics: Topic[] = [
    { id: 1, name: "Information and Ideas", description: "Topic 1" },
    { id: 2, name: "Craft and Structure", description: "Topic 2" },
    { id: 3, name: "Expression of Ideas", description: "Topic 3" },
    { id: 4, name: "Standard English Conventions", description: "Topic 4" },
  ];

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchRandomQuestion(topic);
  };

  const fetchRandomQuestion = async (topic: Topic) => {
    setIsAnswerCorrect(null);

    try {
      // Specify the expected response type
      const response: AxiosResponse<{ doc_array: QuestionData[] }> = await axios.get(
        "/api/get/question?topic=" + topic.name
      );

      // Ensure you access the data properly
      const questionData = response.data.doc_array[0];
      setRandomQuestion(questionData);
    } catch (error) {
      console.error("Error fetching question:", error);
      setRandomQuestion(null);
    }
  };

  const answerCorrectRef: Record<Answers, number> = { A: 0, B: 1, C: 2, D: 3 };

  const handleAnswerSubmit = (answer: Answers) => {
    const correct = answerCorrectRef[answer] === randomQuestion?.correctAnswer;
    if (correct) {
      increaseCorrectCounter();
      increaseScore();
    } else {
      resetCorrectCounter();
    }
    setIsAnswerCorrect(correct);
    if (correct && selectedTopic) {
      setTimeout(() => {
        fetchRandomQuestion(selectedTopic);
      }, 1500);
    }

    setTimeout(() => {
      answerComponent.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleToggleEditorial = () => {
    setOpenEditorial((prev) => !prev);
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
        title="Reading SAT"
        svg={<BookSVG />}
        topics={topics}
        selectedTopic={selectedTopic!}
        handleTopicClick={handleTopicClick}
        openScoreModal={openScoreModal}
        openStreakModal={openStreakModal}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-5 md:p-10">
        {selectedTopic ? (
          <div className="w-full mx-auto">
            <div className="text-center mb-16">
              <Header
                name={selectedTopic.name}
                question={randomQuestion?.question}
              />
            </div>
            {randomQuestion ? (
              <Question
                title={randomQuestion.question}
                optionA={randomQuestion.optionA}
                optionB={randomQuestion.optionB}
                optionC={randomQuestion.optionC}
                optionD={randomQuestion.optionD}
                onAnswerSubmit={handleAnswerSubmit}
                id={randomQuestion.id}
              />
            ) : (
              <p>Loading question...</p>
            )}
            <div className="mt-4 pl-7 pb-10" ref={answerComponent}>
              {isAnswerCorrect !== null && (
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
                        <p className="mt-6">{randomQuestion?.explanation}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center flex-grow">
            <div className="mt-16 text-center">
              <hr className="mx-8 my-5 h-px border-0 bg-gray-200" />
              <p className="text-xl font-medium">Select a topic to start</p>
              <p className="text-gray-400">
                Get started by selecting a topic from the left.
              </p>
            </div>
          </div>
        )}
      </div>

      {isAnnouncerModalOpen && <StreakAnnouncer />}
    </div>
  );
};

export default Home;
