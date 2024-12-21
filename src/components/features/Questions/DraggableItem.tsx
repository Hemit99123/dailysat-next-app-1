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

// Type guard to check if the event is a TouchEvent
const isTouchEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): e is React.TouchEvent<HTMLDivElement> => {
    return 'touches' in e;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ content, title }) => {
    const closeModal = useCalcOptionModalStore((state) => state.closeModal);

    useEffect(() => {
        closeModal();
    }, []);

    const setCalcMode = useCalcModeModalStore((state) => state.setMode);
    const [position, setPosition] = useState<Position>({ x: 0, y: -500 }); // Start with a higher Y position
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false); // Track mobile screen size

    // Check if screen width is mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Listen for window resizing

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Effect to freeze/unfreeze the screen when the modal is shown or hidden
    useEffect(() => {
        if (isMobile) {
            if (position.y !== -500) { // Check if the draggable item is visible
                document.body.classList.add('freeze');
            } else {
                document.body.classList.remove('freeze');
            }
        }
    }, [position.y, isMobile]); // Apply only when position changes

    // Handle mouse down or touch start on the outer draggable component
    const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;

        // Start dragging the whole component (ignoring inner content)
        setIsDragging(true);
        setDragOffset({
            x: clientX - position.x,
            y: clientY - position.y,
        });
    };

    // Handle mouse move or touch move
    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;

            // Prevent page scrolling when dragging the outer component
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

        // Handle mouse up or touch end
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

    // Handle dragging inside the graph content (e.g., panning/zooming the graph)
    const handleGraphInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation(); // Prevent the outer dragging from triggering
        // Add logic for graph-specific interaction (e.g., panning or zooming)
    };

    // Close modal and unfreeze the screen when done
    const closeDraggableItem = () => {
        setCalcMode('none');
        document.body.classList.remove('freeze'); // Unfreeze the screen when done
    };

    return (
        <div className="fixed z-50 flex items-center justify-center">
            <div
                className="bg-white rounded-lg shadow-xl"
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                onMouseDown={handleStart}  // Start dragging from anywhere in the component
                onTouchStart={handleStart} // Start dragging from anywhere in the component
            >
                <div className="flex items-center justify-between p-2 bg-gray-100 cursor-move">
                    <h3 className="font-medium">{title}</h3>
                    <button
                        onClick={closeDraggableItem} // Close the modal and unfreeze the screen
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div
                    className="graph-content"
                    onMouseDown={handleGraphInteraction} // Handle dragging/interaction inside the graph
                    onTouchStart={handleGraphInteraction} // Handle touch interaction inside the graph
                >
                    {content}
                </div>
            </div>
        </div>
    );
};

export default DraggableItem;
