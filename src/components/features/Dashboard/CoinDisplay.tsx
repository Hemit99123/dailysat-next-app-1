import React from 'react';

interface ElementProps {
    header: string;
}

const Element: React.FC<ElementProps> = ({ header }) => { 
    return (
        <div className="shadow-lg rounded-lg w-full bg-white p-4">
            <div className="flex items-center mb-2">
                <svg 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke="#3c82f6"
                    width="35px"
                    height="35px"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M6 4.5H14C14.8284 4.5 15.5 5.17157 15.5 6V14C15.5 14.8284 14.8284 15.5 14 15.5H6C5.17157 15.5 4.5 14.8284 4.5 14V6C4.5 5.17157 5.17157 4.5 6 4.5Z" fill="#3c82f6"></path> 
                    </g>
                    
                </svg>
                <p className="text-sm font-bold text-gray-600">{header}</p>
            </div>
        </div>
    );
}

export default Element;
