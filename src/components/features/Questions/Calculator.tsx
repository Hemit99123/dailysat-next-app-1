'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CalculatorIcon, X } from 'lucide-react';

// Define the Desmos type
declare global {
  interface Window {
    Desmos: {
      GraphingCalculator: (element: HTMLElement) => any;
    };
  }
}

interface Position {
  x: number;
  y: number;
}

const Calculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement('script');
    script.src = 'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
    script.async = true;

    script.onload = () => {
      if (containerRef.current && window.Desmos) {
        const calculator = window.Desmos.GraphingCalculator(containerRef.current);
        setIsReady(true);
        return () => calculator.destroy();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2"
      >
        <CalculatorIcon />
      </button>

      {isOpen && (
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
              <h3 className="font-medium">Calculator</h3>
              <button
                onClick={() => setIsOpen(false)}
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
      )}
    </>
  );
};

export default Calculator;

