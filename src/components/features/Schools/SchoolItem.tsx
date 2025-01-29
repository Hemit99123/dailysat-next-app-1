"use client"

import axios from 'axios';
import React, { useState } from 'react';
import { CiClock2 } from "react-icons/ci";
import { SchoolItemProps } from '@/types/schoolitem';

const SchoolItem: React.FC<SchoolItemProps> = ({ name, location, desc, joined, img }) => {


    const handleJoinSchool = async () => {

    }

    return (
        <div className="shadow-lg rounded-lg h-72 p-6 flex flex-col justify-between bg-white">
            {/* Header Section */}
            <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <img src={img} className="w-12 h-12 rounded-full" alt={name} />
                    <div>
                        <h3 className="text-xl font-bold">{name}</h3>
                        <p className="text-sm text-gray-600">{location}</p>
                    </div>
                </div>

                <button onClick={handleJoinSchool}>
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 inline-block text-transparent bg-clip-text text-xl font-bold">Join</span>
                </button>
            </div>

            
            {/* Description */}
            <p className="text-gray-500 font-medium mt-4 flex-grow">{desc}</p>
            
            {/* Footer Section */}
            <div>
                <hr className="h-px my-4 bg-gray-200 border-0" />
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <CiClock2 className="text-lg" />
                    <p>Joined on {joined}</p>
                </div>
            </div>
        </div>
    );
};

export default SchoolItem;
