import React from 'react';
import useEditorialStore from '@/store/editorial';
import { useEditorialModalStore } from '@/store/modals';
import CloseButton from '@/components/features/shared-components/Cancel'; 

const EditorialModal = () => {
  const onClose = useEditorialModalStore((state) => state.closeModal);
  const isOpen = useEditorialModalStore((state) => state.isOpen);
  const editorial = useEditorialStore((state) => state.editorial);

  if (!isOpen) return null; // Don't render if not open

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
            className='p-10'
          >
            <CloseButton onClose={onClose} /> {/* Include the CloseButton */}
            <h1 className="text-3xl font-bold text-blue-400">Editorials:</h1>
            <p className="text-gray-500 font-light">
              Here is the reasoning behind the correct answer!
            </p>

            {editorial.length === 0 ? (
              <span className="flex justify-center">No editorials found</span>
            ) : (
              editorial.map((items) => (
                <div className="flex flex-col items-center mt-10" key={items.id}>
                  <div className='flex items-center space-x-2 mb-1.5'>
                    {/* Your SVG for the Body title */}
                    <h2 className="text-xl font-semibold">Body:</h2>
                  </div>
                  <p>{items.body}</p>

                  <div className='mt-16 flex space-x-1.5 items-center mb-1.5'>
                    {/* Your SVG for the Reasoning title */}
                    <h2 className="text-xl font-semibold">Reasoning:</h2>
                  </div>
                  <p>{items.reasoning}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditorialModal;
