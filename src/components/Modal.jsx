import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose} 
    >
      <div
        className=" bg-amber-100 md:pt-0  pt-4  rounded-xl shadow-lg w-[392px] h-[640px] md:pl-0 pl-16 relative" 
        onClick={(e) => e.stopPropagation()} 
      >
        
        <button
          className="absolute cursor-pointer -top-3 -right-7 text-4xl font-bold text-red-500 hover:text-red-800 z-100"
          onClick={onClose} 
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
