import { Wrapper } from '@/types/wrapper';
import React, { FC } from 'react';

const MainWrappers: FC<Wrapper> = ({ children }) => { // Correct spelling here
  return (
    <div className="flex flex-col flex-grow p-5 md:p-10">
      {children} 
    </div>
  );
};

export default MainWrappers;
