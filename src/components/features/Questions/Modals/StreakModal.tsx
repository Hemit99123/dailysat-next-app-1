import { useStreakCounterModalStore } from "@/store/modals";
import {useAnswerCounterStore} from "@/store/score";
import React from "react";
import CloseButton from '@/components/features/Shared-Components/Cancel'; 
import ScoreShower from "@/components/features/Sidebar/ScoreShower";

const StreakModal = () => {
    // Retrieve score from score store
    const correctAnswerScore = useAnswerCounterStore((state) => state.count)

    // Close modal function and isOpen state from score modal store
    const onClose = useStreakCounterModalStore((state) => state.closeModal);
    const isOpen = useStreakCounterModalStore((state) => state.isOpen);

    if (!isOpen) return null; // Don't render if not open

    return (
        <div onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
                className="p-10"
            >
                <div className="absolute top-13 right-4 p-2">
                <CloseButton onClose={onClose} /> 
                </div>
                <ScoreShower score={correctAnswerScore}/>
            </div>
        </div>
    );
};

export default StreakModal;
