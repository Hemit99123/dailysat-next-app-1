import React from 'react'

interface CTASideBarProps {
    open: () => void
    text: string
}

const CTASideBar: React.FC<CTASideBarProps> = ({open, text}) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-sm px-1.5 py-3 mt-8">
        <div className="flex items-center mb-0.5">
            <p className="font-medium uppercase text-[12px]">{text}</p>
        </div>
        <button className="font-semibold" onClick={open}>Click here!</button>
    </div>
  )
}

export default CTASideBar