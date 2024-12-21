'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the necessary styles
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

  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

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

  const handleResize = (e: any, data: any) => {
    setDimensions({
      width: data.size.width,
      height: data.size.height,
    });
  };

  return (
    <DraggableItem
      title="Graphing Calculator"
      content={
        <div className="calculator-content">
          <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            minConstraints={[300, 200]} // Minimum size of the box
            maxConstraints={[1200, 800]} // Maximum size of the box
            axis="both"
            resizeHandles={['se']} // Resize from the bottom-right corner
            onResizeStop={handleResize}
            className="resize-box"
          >
            <div
              ref={containerRef}
              className={`w-full h-full ${!isReady ? 'invisible' : ''}`}
            />
          </ResizableBox>
        </div>
      }
    />
  );
};

export default GraphCalculator;
