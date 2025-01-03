import React, { useEffect, useState } from 'react';
import DraggableItem from './DraggableItem';

const RegularCalculator = () => {
  const [expression, setExpression] = useState('');
  const recognizedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/'];

  const handleDeleteEverything  = () => {{
      setExpression("")
  }}

  const handleDeleteOneChar = () => {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  };

  const handleCalculation = () => {
    try {
      // Sanitize input before evaluation
      const sanitizedExpression = expression.replace(/÷/g, '/').replace(/×/g, '*');
      const result = eval(sanitizedExpression); // Use eval with caution
      setExpression(String(result));
    } catch {
      setExpression('Error');
    }
  };

  useEffect(() => {

    // the test() function checks for the below phrases, if found it returns true 
    // if not it will be false 
    
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
    if (isMobile) {
      return; // Exit early if on a mobile device
    }
  
    const handleKeyPress = (event: { key: string }) => {
      if (recognizedKeys.includes(event.key)) {
        setExpression((prevState) => `${prevState}${event.key}`);
      } else if (event.key === 'Backspace') {
        handleDeleteOneChar();
      } else if (event.key === 'Enter') {
        handleCalculation();
      } else if (event.key === 'd') {
        handleDeleteEverything();
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [expression]);
  
  

  const handleButtonClick = (value: string) => {
    if (value === 'DEL') {
      handleDeleteEverything()
    } else if (value === '=') {
      handleCalculation();
    } else if (value === 'C') {
      handleDeleteOneChar();
    } else {
      setExpression((prevState) => `${prevState}${value}`);
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
          <div className="bg-white p-4 mb-4 text-right text-xl font-mono rounded border border-gray-300 overflow-y-auto">
            {expression || '0'}
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