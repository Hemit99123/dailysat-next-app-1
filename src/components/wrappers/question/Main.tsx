import { Wrapper } from '@/types/wrapper';
import React, { FC } from 'react';

const MainWrappers: FC<Wrapper> = ({ children }) => { // Correct spelling here
  return (
    <div className="flex flex-row h-screen">
      {children} 
    </div>
  );
};

export default MainWrappers;
