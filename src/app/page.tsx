"use client";

import { useEffect, useState } from 'react';
import Header from '../components/features/Questions/Header';
import Question from '../components/features/Questions/Question';
import { useAnswerCounterStore, useScoreStore } from '@/store/score';
import ScoreModal from '@/components/features/Questions/Modals/ScoreModal';
import BookSVG from '@/components/features/Questions/icons/BookSVG';
import { useScoreModalStore, useStreakAnnouncerModalStore, useStreakCounterModalStore } from '@/store/modals';
import StreakAnnouncer from '@/components/features/Questions/Modals/StreakAnnouncer';
import CTASideBar from '@/components/features/shared-components/CTASideBar';
import StreakModal from '@/components/features/Questions/Modals/StreakModal';
import { Answers } from '@/types/answer';
import questions from '@/data/questions.js'

interface Topic {
  id: number;
  name: string;
  description: string;
}

interface QuestionData {
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
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [openEditorial, setOpenEditorial] = useState<boolean>(false)

  const increaseScore = useScoreStore((state) => state.increaseScore);
  const increaseCorrectCounter = useAnswerCounterStore((state) => state.increaseCount);
  const resetCorrectCounter = useAnswerCounterStore((state) => state.resetCount);
  const correctCount = useAnswerCounterStore((state) => state.count);

  // Modal handlers
  const openScoreModal = useScoreModalStore((state) => state.openModal);
  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const openAnnouncerModal = useStreakAnnouncerModalStore((state) => state.openModal);
  const isAnnouncerModalOpen = useStreakAnnouncerModalStore((state) => state.isOpen);
  const openStreakModal = useStreakCounterModalStore((state) => state.openModal);
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  useEffect(() => {
    if (correctCount === 3) {
      openAnnouncerModal();
    }
  }, [correctCount, openAnnouncerModal]);

  // List of topics
  const topics: Topic[] = [
    { id: 1, name: "Information and Ideas", description: "Topic 1" },
    { id: 2, name: "Craft and Structure", description: "Topic 2" },
    { id: 3, name: "Expression of Ideas", description: "Topic 3" },
    { id: 4, name: "Standard English Conventions", description: "Topic 4" }
  ];

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchRandomQuestion(topic);
  };

  const fetchRandomQuestion = async (topic: Topic) => {
    const topicName = topic.name

    // Filtering based on the topic that the user has chosen from the topics list
    
    const filteredQuestions = questions.filter(
      (question) => question.skill === topicName
    );

    try {
      if (questions.length > 0) {
        const questionData: QuestionData = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
        setRandomQuestion(questionData)
      } else {
        console.log("No questions available");
      }      
      setIsAnswerCorrect(null); // Reset correctness after a new question
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const answerCorrectRef: Record<Answers, number> = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3
  };

  const handleAnswerSubmit = (answer: Answers) => {
    
    const correct = answerCorrectRef[answer] === randomQuestion?.correctAnswer;

    if (correct) {
      increaseCorrectCounter();
      increaseScore();
    } else {
      resetCorrectCounter();
    }

    setIsAnswerCorrect(correct);

    // Fetch a new question immediately after answering
    if (correct && selectedTopic) {
      fetchRandomQuestion(selectedTopic);
    }
  };
  // Prevent rendering if modals are open
  if (isScoreModalOpen || isStreakModalOpen) {
    return (
      <>
        <ScoreModal />
        <StreakModal />
      </>
    );
  }

  const handleToggleEditorial = () => {
    setOpenEditorial((prev)  => !prev)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-96 flex flex-col p-5 md:p-10">
          <div className="w-full h-14 py-2 cursor-pointer duration-500 hover:bg-gray-50 flex items-center space-x-2">
            <div className="flex-col">
              <div className='flex space-x-2 items-center'>
                <BookSVG />
                <p className="font-semibold">Reading SAT</p>
              </div>
              <p className="uppercase text-[12px] text-gray-400">4 topics</p>
            </div>
          </div>

          <div className="mt-5">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`bg-blue-50 py-3 px-3 mb-2 cursor-pointer ${selectedTopic?.id === topic.id ? 'border-l-4 border-blue-500' : ''}`}
                onClick={() => handleTopicClick(topic)}
              >
                <p className="text-[11px] text-gray-400 uppercase">{topic.description}</p>
                <p className="text-[16px] font-semibold">{topic.name}</p>
              </div>
            ))}
          </div>

          <CTASideBar open={openScoreModal} text='Click to open the scoreboard!' />
          <CTASideBar open={openStreakModal} text='Click to see your current streak!' />
        </div>

        <div className="w-px bg-gray-200 h-px md:h-full"></div>

        <div className="flex flex-col md:flex-grow p-5 md:p-10">
          {selectedTopic ? (
            <div className="w-full">
              <div className="text-center mb-16">
                <Header name={selectedTopic.name} />
              </div>
              {randomQuestion ? (
                <Question
                  title={randomQuestion.question}
                  optionA={randomQuestion.optionA}
                  optionB={randomQuestion.optionB}
                  optionC={randomQuestion.optionC}
                  optionD={randomQuestion.optionD}
                  onAnswerSubmit={handleAnswerSubmit}
                />
              ) : (
                <p>Loading question...</p>
              )}
              <div className="mt-4 pl-7">
                {isAnswerCorrect !== null ? (
                  <>
                    {isAnswerCorrect ? (
                      <p className="text-green-500 text-lg font-semibold">You are correct!</p>
                    ) : (
                      <div>
                        <p className="text-red-500 text-lg font-semibold">You are wrong :(</p>
                        <button onClick={handleToggleEditorial}>Do you want to see the editorials? Click here!</button>
                        {openEditorial &&
                          <p className="mt-6">{randomQuestion?.explanation}</p>
                        }
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center flex-grow">
              <div className="mt-16 text-center">
                <hr className="mx-8 my-5 h-px border-0 bg-gray-200" />
                <p className="text-xl font-medium">Select a topic to start</p>
                <p className="text-gray-400">Get started by selecting a topic from the left.</p>
              </div>
            </div>
          )}
        </div>

        {isAnnouncerModalOpen && <StreakAnnouncer />}
      </div>
    </>
  );
};

export default Home;
