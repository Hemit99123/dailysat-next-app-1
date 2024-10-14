import { useScoreModalStore } from "@/store/modals";
import useScoreStore from "@/store/score";
import Modal from "@/wrappers/Modal";
import React from "react";

const ScoreModal = () => {
    // Retrieve score from score store
    const score = useScoreStore((state) => state.score);

    // Close modal function and isOpen state from score modal store
    const onClose = useScoreModalStore((state) => state.closeModal);
    const isOpen = useScoreModalStore((state) => state.isOpen);

    return (
        <>
            {isOpen && (
                <Modal onClose={onClose}>
                    <div className="max-h-screen">
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
                </Modal>
            )}
        </>
    );
};

export default ScoreModal;
