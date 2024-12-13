import React from 'react';

interface ElementProps {
    children: React.ReactElement; // Fixed typo
}

const Element: React.FC<ElementProps> = ({ children }) => { // Fixed typo
    return (
        <div className="shadow-lg rounded-lg px-80 w-full bg-white">
            {children}
        </div>
    );
}

export default Element;
