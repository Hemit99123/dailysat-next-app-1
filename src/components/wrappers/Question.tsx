import React, { FC } from 'react';

interface QuestionWrapperProps {
  children: React.ReactNode; // Correct spelling here
}

const QuestionWrappers: FC<QuestionWrapperProps> = ({ children }) => { // Correct spelling here
  return (
    <div className="flex flex-col flex-grow p-5 md:p-10">
      {children} 
    </div>
  );
};

export default QuestionWrappers;
