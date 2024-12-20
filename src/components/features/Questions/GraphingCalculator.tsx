'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { DesmosCalculator } from '@/types/desmos';

// Define interface for Desmos Calculator instance


// Define the Desmos type
declare global {
  interface Window {
    Desmos: {
      GraphingCalculator: (element: HTMLElement) => DesmosCalculator;
    };
  }
}

interface Position {
  x: number;
  y: number;
}

interface GraphCalculatorProps {
  handleEndState: () => void;
}

const GraphCalculator: React.FC<GraphCalculatorProps> = ({ handleEndState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.closest('.calculator-content')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-white rounded-lg shadow-xl"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className="flex items-center justify-between p-2 bg-gray-100 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <h3 className="font-medium">Graphing Calculator</h3>
          <button
            onClick={handleEndState}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="calculator-content">
          <div
            ref={containerRef}
            className={`w-[600px] h-[400px] ${!isReady ? 'invisible' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphCalculator;