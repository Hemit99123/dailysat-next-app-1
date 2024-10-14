import React from 'react';
import useEditorialStore from '@/store/editorial';
import { useEditorialModalStore } from '@/store/modals';
import Modal from '@/wrappers/Modal';

const EditorialModal = () => {
  const onClose = useEditorialModalStore((state) => state.closeModal);
  const isOpen = useEditorialModalStore((state) => state.isOpen);
  const editorial = useEditorialStore((state) => state.editorial);

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="my-5 mx-10">
            <h1 className="text-3xl font-bold text-blue-400">Editorials:</h1>
            <p className="text-gray-500 font-light">
              Here is the reasoning behind the correct answer!
            </p>
          </div>

          {editorial.length === 0 ? (
            <span className="flex justify-center">No editorials found</span>
          ) : (
            editorial.map((items) => (
              <div className="flex flex-col items-center mt-10" key={items.id}>
                <div className='flex items-center space-x-2 mb-1.5'>
                  <svg viewBox="0 0 24 24" height="25px" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z" fill="#0F0F0F"></path> </g></svg>
                  <h2 className="text-xl font-semibold">Body:</h2>
                </div>

                <p>{items.body}</p>
                
                <div className='mt-16 flex space-x-1.5 items-center mb-1.5'>
                  <svg version="1.1" height="25px" width="25px" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="puchipuchi_een" d="M21,24c0,0.552-0.447,1-1,1h-8c-0.553,0-1-0.448-1-1s0.447-1,1-1h8C20.553,23,21,23.448,21,24z M20,26h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S20.553,26,20,26z M15,29v1c0,0.552,0.448,1,1,1s1-0.448,1-1v-1 H15z M26,11c0,5-5,8-5,10c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1c0-2-5-5-5-10C6,5.477,10.477,1,16,1S26,5.477,26,11z M17,4 c0-0.552-0.447-1-1-1c-4.411,0-8,3.589-8,8c0,0.552,0.447,1,1,1s1-0.448,1-1c0-3.309,2.691-6,6-6C16.553,5,17,4.552,17,4z"></path> </g></svg>                
                  <h2 className="text-xl font-semibold">Reasoning:</h2>
                </div>

                <p>{items.reasoning}</p>
              </div>
            ))
          )}
        </Modal>
      )}
    </>
  );
};

export default EditorialModal;
