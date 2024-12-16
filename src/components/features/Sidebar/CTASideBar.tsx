"use client";

import React, { useEffect, useState } from "react";
import sidebar from "@/types/sidebar";

interface CTASideBarProps {
    open: () => void;
    text: string;
}

const CTASideBar: React.FC<CTASideBarProps> = ({ open, text }) => {

    // State to manage visibility of the sidebar
    const [isVisible, setIsVisible] = useState<sidebar>("loading");
    const nameLocalStorage = `${text}-visible`; // Key for localStorage

    // Run once component is mounted to ensure proper hydration
    useEffect(() => {
        const localStorageItem = window.localStorage.getItem(nameLocalStorage);

        if (!localStorageItem) {
            // If localStorage item doesn't exist, set default state to "show"
            window.localStorage.setItem(nameLocalStorage, "show");
            setIsVisible("show");
        } else {
            // Set state based on the stored value
            setIsVisible(localStorageItem as "show" | "hide");
        }
    }, []);

    // Toggle between "show" and "hide" states through the ? operator
    // If isVisible is show make it hide otherwise it is hide so then make it show
    // Because we do the opposite of the current value :)

    const toggleVisibility = () => {
        const newValue: sidebar = isVisible === "show" ? "hide" : "show";
        window.localStorage.setItem(nameLocalStorage, newValue);
        setIsVisible(newValue);
    };

    return (
        <>
            {isVisible === "show" ? (
                <div className="flex flex-col border border-gray-200 rounded-sm px-1.5 py-3 mt-8">
                    <div className="flex items-center mb-0.5">
                        <p className="font-medium uppercase text-[12px]">{text}</p>
                    </div>
                    <button className="font-semibold" onClick={open}>
                        Click here!
                    </button>
                    <button
                        className="mt-2 text-sm text-white bg-blue-400 hover:bg-red-400 px-3 py-1 rounded-full transition ease-in-out duration-300 transform hover:scale-105 shadow-md"
                        onClick={toggleVisibility}
                    >
                        <span className="mr-2">👋</span> Hide
                    </button>
                </div>
            ) : isVisible === "hide" ? (
                <button
                    className="font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
                    onClick={toggleVisibility}
                >
                    Show Sidebar
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

export default CTASideBar;
