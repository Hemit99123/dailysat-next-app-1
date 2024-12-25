import { useCalcModeModalStore, useCalcOptionModalStore } from '@/store/modals';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DraggableItemProps {
    content: React.ReactNode;
    title: string;
}

interface Position {
    x: number;
    y: number;
}

const isTouchEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): e is React.TouchEvent<HTMLDivElement> => {
    return 'touches' in e;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ content, title }) => {
    const closeModal = useCalcOptionModalStore((state) => state.closeModal);
    const setCalcMode = useCalcModeModalStore((state) => state.setMode);
    
    const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        closeModal();
    }, [closeModal]);

    const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;

        setIsDragging(true);
        setDragOffset({ x: clientX - position.x, y: clientY - position.y });

        // Prevent default behavior for touch move
        if (isTouchEvent(e)) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;

            const clientX = e instanceof MouseEvent ? e.clientX : (e as TouchEvent).touches[0].clientX;
            const clientY = e instanceof MouseEvent ? e.clientY : (e as TouchEvent).touches[0].clientY;

            setPosition({
                x: clientX - dragOffset.x,
                y: clientY - dragOffset.y,
            });

            // Prevent default behavior during dragging on touch
            if (isTouchEvent(e)) {
                e.preventDefault();
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, dragOffset]);

    const handleGraphInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
    };

    const closeDraggableItem = () => {
        setCalcMode('none');
    };

    return (
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0">
            <div
                className={`bg-white rounded-lg shadow-xl transition-opacity ${isDragging ? 'opacity-80' : 'opacity-100'}`}
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: '300px',
                    height: '200px',
                }}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <div className="flex items-center justify-between p-2 bg-gray-100 cursor-move">
                    <h3 className="font-medium">{title}</h3>
                    <button
                        onClick={closeDraggableItem}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div
                    className="graph-content"
                    onMouseDown={handleGraphInteraction}
                    onTouchStart={handleGraphInteraction}
                >
                    {content}
                </div>
            </div>
        </div>
    );
};

export default DraggableItem;
