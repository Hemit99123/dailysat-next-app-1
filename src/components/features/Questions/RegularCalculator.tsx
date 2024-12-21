import React, { useState } from 'react';
import DraggableItem from './DraggableItem';

const RegularCalculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value: string ) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '÷', 
    '4', '5', '6', '×', 
    '1', '2', '3', '-', 
    '0', '.', '=', '+', 
    'DEL'
  ];
  
  return (
    <DraggableItem
      title="Regular Calculator"
      content={
        <div className="bg-gray-100 p-4 rounded shadow-lg w-80">
          {/* Display */}
          <div className="bg-white p-4 mb-4 text-right text-xl font-mono rounded border border-gray-300">
            {input || '0'}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <button
                key={btn}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow font-bold text-lg"
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default RegularCalculator;
