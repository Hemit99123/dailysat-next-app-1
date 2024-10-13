import React from 'react';

const Spinner: React.FC = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

export default Spinner;
