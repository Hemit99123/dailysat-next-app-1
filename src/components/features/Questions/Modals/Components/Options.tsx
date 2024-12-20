import React from 'react'

interface OptionsProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Options: React.FC<OptionsProps> = ({icon, title, description}) => {
  return (
    <div className="flex  rounded-lg border border-gray-300 px-2 py-10 cursor-pointer mt-4">
        <div className="ml-2">
            {icon}
        </div>

        <div className="flex flex-col ml-4">
            <p className="font-bold">{title}</p>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </div>
  )
}

export default Options