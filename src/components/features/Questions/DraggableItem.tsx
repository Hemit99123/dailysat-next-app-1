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

const DraggableItem: React.FC<DraggableItemProps> = ({ content, title }) => {
    const closeModal = useCalcOptionModalStore((state) => state.closeModal);

    useEffect(() => {
        closeModal();
    }, []);

    const setCalcMode = useCalcModeModalStore((state) => state.setMode);
    const [position, setPosition] = useState<Position>({ x: 0, y: -500 }); // Start with a higher Y position
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

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
        <div className="fixed z-50 flex items-center justify-center">
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
                    <h3 className="font-medium">{title}</h3>
                    <button
                        onClick={() => setCalcMode('none')}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                {content}
            </div>
        </div>
    );
};

export default DraggableItem;
