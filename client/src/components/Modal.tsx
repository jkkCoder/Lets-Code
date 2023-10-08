import React from 'react';
import {MdClose} from "react-icons/md"


const Modal =  ({
  title,
  primaryBtnName,
  secondaryBtnName,
  primaryCta,
  secondaryCta,
  showModal,
  onClose,
}) => {
  if (!showModal) {
    return null; // Return null if showModal is false to hide the modal
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-80">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <MdClose />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex justify-end">
          <button
            onClick={primaryCta}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {primaryBtnName}
          </button>
          <button
            onClick={secondaryCta}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            {secondaryBtnName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
