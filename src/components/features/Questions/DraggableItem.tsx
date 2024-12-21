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

    useEffect(() => {
        closeModal();
    }, []);

    const setCalcMode = useCalcModeModalStore((state) => state.setMode);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            if (position.y !== -500) {
                document.body.classList.add('freeze');
            } else {
                document.body.classList.remove('freeze');
            }
        }
    }, [position.y, isMobile]);

    const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;

        setIsDragging(true);
        setDragOffset({
            x: clientX - position.x,
            y: clientY - position.y,
        });
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;

            if (e.target instanceof HTMLElement && !e.target.closest('.graph-content')) {
                e.preventDefault();
            }

            const clientX = e instanceof MouseEvent ? e.clientX : (e as TouchEvent).touches[0].clientX;
            const clientY = e instanceof MouseEvent ? e.clientY : (e as TouchEvent).touches[0].clientY;

            setPosition({
                x: clientX - dragOffset.x,
                y: clientY - dragOffset.y,
            });
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMove, { passive: false });
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
        document.body.classList.remove('freeze');
    };

    return (
        <div className="fixed z-50 flex items-center justify-center top-0 left-0 right-0 bottom-0">
            <div
                className="bg-white rounded-lg shadow-xl"
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
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
