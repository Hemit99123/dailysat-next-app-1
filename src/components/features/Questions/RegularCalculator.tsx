import React, { useEffect, useState } from 'react';
import DraggableItem from './DraggableItem';

const RegularCalculator = () => {
  const [input, setInput] = useState('');
  const numberList = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]

  useEffect(() => {
    const handleKeyPress = (event: { key: string; }) => {
      if (numberList.includes(event.key)) {
        setInput((prevState) => `${prevState}${event.key}`);
        console.log(event.key)
      }
    };
  
    document.addEventListener("keypress", handleKeyPress);
  
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []); // The empty dependency array ensures the listener is added only once.
  

  const handleButtonClick = (value: string) => {
    if (value === 'DEL') {
      setInput('');
    } else if (value === '=') {
      try {
        // Replace display operators with JavaScript operators for eval
        const sanitizedInput = input.replace(/÷/g, '/').replace(/×/g, '*');
        // Use eval to calculate the result
        setInput(eval(sanitizedInput).toString());
      } catch {
        setInput('Error');
      }
    } else if (value == "C" && input !== "0") {
        const arrayOfChars = input.split('')
        const newExpression = arrayOfChars.slice(0, -1).join("")
        
        setInput(newExpression)
    } else {
      // Prevent multiple consecutive operators (e.g., "++", "--", "**", "//")
      if (/[\+\-\×\÷\.]$/.test(input) && /[\+\-\×\÷\.]/.test(value)) {
        return;
      }
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'DEL', 'C'
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
