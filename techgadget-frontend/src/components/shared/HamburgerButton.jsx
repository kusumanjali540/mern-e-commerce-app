import React from "react";

const HamburgerButton = ({ onChange, isOpen, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={onChange}
        className="block absolute left-[-7px] top-[-5px] w-10 h-10 opacity-0 z-10"
      />

      <span
        className={`block w-8 h-1 mb-2 origin-left bg-black rounded transition-all ${
          isOpen && "rotate-45 translate-y-[1px]"
        }`}
      ></span>
      <span
        className={`block w-8 h-1 mb-2 bg-black rounded transition-all ${
          isOpen && "opacity-0"
        }`}
      ></span>
      <span
        className={`block w-8 h-1 mb-2 origin-left bg-black rounded transition-all ${
          isOpen && "-rotate-45"
        }`}
      ></span>
    </div>
  );
};

export default HamburgerButton;
