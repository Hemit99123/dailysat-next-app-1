import React from 'react';

interface AnswerOptionProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean; // Optional prop to indicate selection
  isCrossedOff?: boolean; // New prop for crossed-off state
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ text, onClick, isSelected, isCrossedOff }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg text-left border-2 transition-colors ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'
      } ${isCrossedOff ? 'line-through text-gray-500' : ''}`}
      style={{ textDecoration: isCrossedOff ? 'line-through' : 'none' }}
    >
      {text}
    </button>
  );
};

export default AnswerOption;
