import { useScoreModalStore } from "@/store/modals";
import useScoreStore from "@/store/score";
import React from "react";
import CloseButton from '@/components/features/shared-components/Cancel'; 

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
                
                {/* Score Message */}
                <p className="text-gray-500 text-center font-light text-2xl mt-10">
                    You got these many points...
                </p>

                <div className="flex items-center justify-center mt-20">
                    <div className="relative">
                        <div className="border-8 border-blue-500 rounded-full w-96 h-96 flex items-center justify-center">
                            <div className="text-7xl font-semibold">
                                {score}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreModal;
