import React from 'react';
import { CiClock2 } from "react-icons/ci";

interface SchoolItemProps {
    name: string;
    location: string;
    desc: string;
    joined: string;
    img: string;
}

const SchoolItem: React.FC<SchoolItemProps> = ({ name, location, desc, joined, img }) => {
    return (
        <div className="shadow-lg rounded-lg h-72 p-6 flex flex-col justify-between bg-white">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
                <img src={img} className="w-12 h-12 rounded-full" alt={name} />
                <div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-gray-600">{location}</p>
                </div>
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
