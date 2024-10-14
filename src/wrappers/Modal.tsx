"use client"

import React from 'react';

interface ModalProps {
    onClose: () => void; // Callback function to close the modal
    children: React.ReactNode; // Children elements to be displayed in the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-1.5 h-full">
                                            {/* Close Button */}
                                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
