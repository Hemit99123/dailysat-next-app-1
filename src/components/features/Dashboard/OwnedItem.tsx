import React from 'react';

interface OwnedItemProps {
  url: string;
  name: string;
  category: string;
  worth: number;
}

const OwnedItem: React.FC<OwnedItemProps> = ({ url, name, category, worth }) => {
  return (
    <>
      <div className="flex items-center p-4 cursor-pointer hover:bg-gray-50 duration-150">
        {/* Image */}
        <div className="w-12 h-12 flex-shrink-0">
          <img src={url} alt={`${name}`} className="rounded-full w-full h-full object-cover" />
        </div>

        {/* Name */}
        <div className="flex-1 pl-4">
          <p className="font-bold text-gray-800">{name}</p>
        </div>

        {/* Category */}
        <div className="flex-1 text-center">
          <p className="text-gray-600">{category}</p>
        </div>

        {/* Worth */}
        <div className="flex-1 text-right">
          <p className="text-gray-800 font-medium">{worth} coins</p>
        </div>
      </div>
      <hr className="h-px bg-gray-300 border-0" />
    </>
  );
};

export default OwnedItem;
