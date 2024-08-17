import React from "react";

const HamburgerIcon = ({ isOpen }) => {
  return (
    <>
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
    </>
  );
};

export default HamburgerIcon;
