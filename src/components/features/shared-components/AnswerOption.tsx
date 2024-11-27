import React from 'react';

interface AnswerOptionProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean; // Optional prop to indicate selection
}

const AnswerOption: React.FC<AnswerOptionProps> = ({text, onClick, isSelected }) => {
  return (
    <div 
      className={`cursor-pointer p-2 border rounded ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}`} 
      onClick={onClick}
    >
      <span className="font-semibold"></span> {text}
    </div>
  );
};

export default AnswerOption;
