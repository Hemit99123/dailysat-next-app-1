import React from "react";

interface HeaderProps {
  name: string;
}


const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="mt-2 flex justify-center space-x-3">
        <div className="flex items-center space-x-1">
          <img
            src="https://cdn.kastatic.org/images/google_classroom_color.png"
            alt="Google Classroom"
            className="h-[16px] w-[16px]"
          />
          <p className="cursor-pointer text-blue-600 hover:underline">Google Classroom</p>
        </div>
        <div className="flex items-center space-x-1">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLQUW9FJ6oz2WOkfU_2SbFanfDvOXrYVfE4SuaDyrz0=s900-c-k-c0x00ffffff-no-rj"
            alt="LinkedIn"
            className="h-[25px] w-[25px]"
          />
          <p className="cursor-pointer text-blue-600 hover:underline">LinkedIn</p>
        </div>
      </div>
    </>
  );
};

export default Header;
