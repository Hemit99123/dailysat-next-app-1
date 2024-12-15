import React from 'react';
import { trend } from '@/types/trend';

interface CoinDisplayProps {
    header: string;
    coins: number;
    status: trend;
    percentage: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ header, coins, status, percentage }) => { 
    return (
        <div className="shadow-lg rounded-lg w-full bg-white p-4">
            <div className="flex items-center mb-3">
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
            <div>
                <p className="text-6xl font-bold">
                    {coins} <span className="text-xl text-gray-400">coins</span>
                </p>

                {/* The amount changed view render */}

                <p 
                    className={`mt-5 font-semibold ${status == "downward" ? "text-red-500": "text-green-500"}`}
                >
                    {status == "downward" ? "-" : "+"}{percentage}% change this week
                </p>
            </div>
        </div>
    );
}

export default CoinDisplay;
