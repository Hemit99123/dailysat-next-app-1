import { useCalcOptionModalStore } from '@/store/modals';
import React from 'react';
import Options from './Components/Options';

const CalcOption = () => {
  const isOpen = useCalcOptionModalStore((state) => state.isOpen);
  const closeModal = useCalcOptionModalStore((state) => state.closeModal);

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-12 w-[800px]" // Increased width and padding
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside (like the buttons)
          >
            <h2 className="text-2xl font-bold">Calculator Options</h2>
            <p className="text-sm text-gray-500">Select one of the following options:</p>
            <Options 
              title='Graphing'
              description='Use this to graph equations'
              icon={
                  <svg
                    fill="#000000"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    width="45px" 
                    height="45px" 
                  >
                    <path d="M29.5 7c-1.381 0-2.5 1.12-2.5 2.5 0 0.284 0.058 0.551 0.144 0.805l-6.094 5.247c-0.427-0.341-0.961-0.553-1.55-0.553-0.68 0-1.294 0.273-1.744 0.713l-4.774-2.39c-0.093-1.296-1.162-2.323-2.482-2.323-1.38 0-2.5 1.12-2.5 2.5 0 0.378 0.090 0.732 0.24 1.053l-4.867 5.612c-0.273-0.102-0.564-0.166-0.873-0.166-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5 0-0.332-0.068-0.649-0.186-0.939l4.946-5.685c0.236 0.073 0.48 0.124 0.74 0.124 0.727 0 1.377-0.316 1.834-0.813l4.669 2.341c0.017 1.367 1.127 2.471 2.497 2.471 1.381 0 2.5-1.119 2.5-2.5 0-0.044-0.011-0.086-0.013-0.13l6.503-5.587c0.309 0.137 0.649 0.216 1.010 0.216 1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5z"></path>
                  </svg>
              }
            />
            <Options 
              title='Regular'
              description='Use this for everyday calculations'
              icon={
                <svg width="45px" height="45px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#00000" d="M0,13.5C0,14.327,0.673,15,1.5,15h12c0.827,0,1.5-0.673,1.5-1.5v-12C15,0.673,14.327,0,13.5,0h-12 C0.673,0,0,0.673,0,1.5V13.5z M1,1.5C1,1.225,1.225,1,1.5,1h12C13.775,1,14,1.225,14,1.5v12c0,0.275-0.225,0.5-0.5,0.5h-12 C1.225,14,1,13.775,1,13.5V1.5z"></path> <path fill="#00000" d="M32,1.5C32,0.673,31.327,0,30.5,0h-12C17.673,0,17,0.673,17,1.5v12c0,0.827,0.673,1.5,1.5,1.5h12 c0.827,0,1.5-0.673,1.5-1.5V1.5z M31,13.5c0,0.275-0.225,0.5-0.5,0.5h-12c-0.275,0-0.5-0.225-0.5-0.5v-12C18,1.225,18.225,1,18.5,1 h12C30.775,1,31,1.225,31,1.5V13.5z"></path> <path fill="#00000" d="M0,30.5C0,31.327,0.673,32,1.5,32h12c0.827,0,1.5-0.673,1.5-1.5v-12c0-0.827-0.673-1.5-1.5-1.5h-12 C0.673,17,0,17.673,0,18.5V30.5z M1,18.5C1,18.225,1.225,18,1.5,18h12c0.275,0,0.5,0.225,0.5,0.5v12c0,0.275-0.225,0.5-0.5,0.5h-12 C1.225,31,1,30.775,1,30.5V18.5z"></path> <path fill="#00000" d="M18.5,32h12c0.827,0,1.5-0.673,1.5-1.5v-12c0-0.827-0.673-1.5-1.5-1.5h-12c-0.827,0-1.5,0.673-1.5,1.5v12 C17,31.327,17.673,32,18.5,32z M18,18.5c0-0.275,0.225-0.5,0.5-0.5h12c0.275,0,0.5,0.225,0.5,0.5v12c0,0.275-0.225,0.5-0.5,0.5h-12 c-0.275,0-0.5-0.225-0.5-0.5V18.5z"></path> <path fill="#00000" d="M5,8h2v2c0,0.276,0.224,0.5,0.5,0.5S8,10.276,8,10V8h2c0.276,0,0.5-0.224,0.5-0.5S10.276,7,10,7H8V5 c0-0.276-0.224-0.5-0.5-0.5S7,4.724,7,5v2H5C4.724,7,4.5,7.224,4.5,7.5S4.724,8,5,8z"></path> <path fill="#00000" d="M27,7h-5c-0.276,0-0.5,0.224-0.5,0.5S21.724,8,22,8h5c0.276,0,0.5-0.224,0.5-0.5S27.276,7,27,7z"></path> <path fill="#00000" d="M22,24h5c0.276,0,0.5-0.224,0.5-0.5S27.276,23,27,23h-5c-0.276,0-0.5,0.224-0.5,0.5S21.724,24,22,24z"></path> <path fill="#00000" d="M22,26h5c0.276,0,0.5-0.224,0.5-0.5S27.276,25,27,25h-5c-0.276,0-0.5,0.224-0.5,0.5S21.724,26,22,26z"></path> <path fill="#00000" d="M5.038,27.5c0.098,0.098,0.226,0.146,0.354,0.146s0.256-0.049,0.354-0.146l1.988-1.988L9.722,27.5 c0.098,0.098,0.226,0.146,0.354,0.146s0.256-0.049,0.354-0.146c0.195-0.195,0.195-0.512,0-0.707L8.44,24.805l1.988-1.988 c0.195-0.195,0.195-0.512,0-0.707s-0.512-0.195-0.707,0l-1.988,1.988l-1.988-1.988c-0.195-0.195-0.512-0.195-0.707,0 s-0.195,0.512,0,0.707l1.988,1.988l-1.988,1.988C4.843,26.988,4.843,27.305,5.038,27.5z"></path> </g> </g></svg>
              }
            />
            <div className="mt-4 flex">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalcOption;
