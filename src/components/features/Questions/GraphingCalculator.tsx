'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DesmosCalculator } from '@/types/desmos';
import DraggableItem from '@/components/features/Questions/DraggableItem';

// Define the Desmos type
declare global {
  interface Window {
    Desmos: {
      GraphingCalculator: (element: HTMLElement) => DesmosCalculator;
    };
  }
}


const GraphCalculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const calculatorRef = useRef<DesmosCalculator | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
    script.async = true;

    script.onload = () => {
      if (containerRef.current && window.Desmos) {
        // Only initialize the calculator if it's not already initialized
        if (!calculatorRef.current) {
          calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current);
          setIsReady(true);
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup calculator if it was initialized
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
      }
      document.body.removeChild(script);
    };
  }, []);



  return (
    <DraggableItem 
      title='Graphing Calculator'
      content={
        <div className="calculator-content">
          <div
            ref={containerRef}
            className={`w-[600px] h-[400px] ${!isReady ? 'invisible' : ''}`}
          />
        </div>
      }
    />
  );
};

export default GraphCalculator;