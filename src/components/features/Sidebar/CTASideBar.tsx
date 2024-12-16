"use client"

import React, { useEffect, useState, Fragment } from 'react'

interface CTASideBarProps {
    open: () => void
    text: string
}

const CTASideBar: React.FC<CTASideBarProps> = ({ open, text }) => {
    
    // This is to force a re-render of this component
    const [key, setKey] = useState(0)

    // To keep what localstorage said
    const [isVisible, setIsVisible] = useState("")
    const name = `${text}-visible`

    // Run this once component is mounted so that it doesn't run on server-side (windows not available in server)
    // We are checking if the localstorage item exists, if not create if and then setIsvisible to show
    // If it DOES, set isvisible to the localstorage item itself

    useEffect(() => {
        const localStorageItem = window.localStorage.getItem(name)
    
        if (!localStorageItem) {
            window.localStorage.setItem(name, "show")
            setIsVisible("show")
        } else {
            setIsVisible(localStorageItem)
        }
    } , [])



    const toggleVisibility = () => {
        let value;

        if (isVisible == "show") {
            value = "noshow"
        } else {
            value = "show"
        }

        window.localStorage.setItem(name, value)
        setKey(prevKey => prevKey + 1); // Changing the key forces a remount as it changes the state and state changes cause re-render

    };


    return (
        <Fragment key={key}>
            {isVisible == "show" ? (
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
            ) : (
                <button
                    className="font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
                    onClick={toggleVisibility}
                >
                    Show Sidebar
                </button>
            )}
        </Fragment>
    )
}

export default CTASideBar
