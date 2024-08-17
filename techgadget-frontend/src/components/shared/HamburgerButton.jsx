import React from "react";
import HamburgerIcon from "./HamburgerIcon";

const HamburgerButton = ({ onChange, isOpen, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={onChange}
        className="block absolute left-[-7px] top-[-5px] w-10 h-10 opacity-0 z-10 hover:cursor-pointer"
      />

      <HamburgerIcon isOpen={isOpen} />
    </div>
  );
};

export default HamburgerButton;
