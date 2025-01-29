import React from 'react'
import { CiClock2 } from "react-icons/ci";

interface SchoolItemProps {
    name: string;
    location: string;
    desc: string;
    joined: string;
    img: string;
}

const SchoolItem: React.FC<SchoolItemProps> = ({name, location, desc, joined, img}) => {
  return (
    <div className="shadow-lg rounded-lg h-72">
        <div className="flex items-center">
            <img 
                src={img}
                className="w-12 h-12"
            />

            <div>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-sm text-gray-800">{location}</p>
            </div>
        </div>

        <p>{desc}</p>

        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex items-center">
            <CiClock2 />
            <p className="text-sm text-gray-500">Joined on {joined}</p>
        </div>
    </div>
  )
}

export default SchoolItem