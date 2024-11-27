import React, { useState } from 'react'

interface CTASideBarProps {
    open: () => void
    text: string
}

const CTASideBar: React.FC<CTASideBarProps> = ({ open, text }) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {isVisible && (
                <div className="flex flex-col border border-gray-200 rounded-sm px-1.5 py-3 mt-8">
                    <div className="flex items-center mb-0.5">
                        <p className="font-medium uppercase text-[12px]">{text}</p>
                    </div>
                    <button className="font-semibold" onClick={open}>Click here!</button>
                    <button
                        className="mt-2 text-sm text-white bg-blue-400 hover:bg-red-400 px-3 py-1 rounded-full transition ease-in-out duration-300 transform hover:scale-105 shadow-md"
                        onClick={toggleVisibility}
                    >
                        <span className="mr-2">👋</span> Hide
                    </button>
                </div>
            )}
            {!isVisible && (
                <button
                    className="font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
                    onClick={toggleVisibility}
                >
                    Show Sidebar
                </button>
            )}
        </>
    )
}

export default CTASideBar
