import React from 'react';

interface ExtraModalDisplayProps {
    header: string;
    desc: string;
    color: string;
    art?: string;
}

const ExtraModal: React.FC<ExtraModalDisplayProps> = ({ art, header, desc }) => {
    return (
        <div className="shadow-lg w-full rounded-lg bg-white p-4">
            <div className="flex items-center flex-col mb-3">
                <p className="text-3xl font-bold ml-2 text-blue-500">{header}</p>
                <p className="text-lg font-semibold text-gray-600 ml-2">{desc}</p>
            </div>
            <img src={art} className="w-32 ml-auto mr-auto " />
            <div className='flex justify-center mt-10 items-center'>
            </div>
        </div>
    );
}

export default ExtraModal;