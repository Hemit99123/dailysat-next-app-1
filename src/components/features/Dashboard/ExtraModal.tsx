import React from 'react';

type ExtraModalType = "URL" | "connect"
interface ExtraModalDisplayProps {
    header: string;
    type: ExtraModalType;
    desc: string;
    color: string;
    buttonText: string;
    url?: string;
    art?: string;
}

const ExtraModal: React.FC<ExtraModalDisplayProps> = ({ art, header, desc, type, url, buttonText }) => {
    return (
        <div className="shadow-lg w-full rounded-lg bg-white p-4">
            <div className="flex items-center flex-col mb-3">
                <p className={`text-3xl font-bold text-gray-900 ml-2`}>{header}</p>
                <p className={`text-lgfont-bold text-gray-600 ml-2`}>{desc}</p>
            </div>
            <img src={art} className="w-32 ml-auto mr-auto " />
            <div className='flex justify-center mt-10 items-center'>
                {type == "URL" && (
                    <button
                        onClick={() => window.location.href = url || "/"}
                        className="-mt-5 px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ExtraModal;