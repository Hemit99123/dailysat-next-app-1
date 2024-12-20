"use client"

import Sidebar from "@/components/features/Sidebar/Sidebar";
import { mathTopics } from '@/data/topics'; // Assuming readingTopics is an array of topics
import MathSVG from "@/components/features/Questions/icons/MathSVG"
import { Topic } from "@/types/topic";
import { useState } from "react";
import MathQuestion from "@/components/features/Questions/Question-UI/MathQuestion";
import Header from "@/components/features/Questions/Header";

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    // Fetch new question based on selected topic
  };

  const openScoreModal = () => {
    // Open score modal logic
  };

  const openStreakModal = () => {
    // Open streak modal logic
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar
        title="Math"
        svg={<MathSVG />}
        topics={mathTopics} // Pass topics
        selectedTopic={selectedTopic!} // Pass selected topic
        handleTopicClick={handleTopicClick} // Handle topic click
        openScoreModal={openScoreModal}
        openStreakModal={openStreakModal}
      />
      {/* Main content goes here */}
      <div className="flex flex-col flex-grow p-5 md:p-10">
        <Header
            name={"test"}
            question={"What is 2+2"}
        />
        <MathQuestion 
          title="What is 2+2"
          onAnswerSubmit={() => alert("sigma")}
          optionA="2"
          optionB="4"
          optionC="3"
          optionD="3"
          id="2"
        />
      </div>
    </div>
  );
};

export default Home;
