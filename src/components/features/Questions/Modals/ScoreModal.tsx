import { useScoreModalStore } from "@/store/modals";
import {useScoreStore} from "@/store/score";
import React from "react";
import CloseButton from '@/components/features/g/Cancel'; 
import ScoreShower from "../../Sidebar/ScoreShower";

const ScoreModal = () => {
    // Retrieve score from score store
    const score = useScoreStore((state) => state.score);

    // Close modal function and isOpen state from score modal store
    const onClose = useScoreModalStore((state) => state.closeModal);
    const isOpen = useScoreModalStore((state) => state.isOpen);

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
                 
                <ScoreShower score={score}/>
            </div>
        </div>
    );
};

export default ScoreModal;
