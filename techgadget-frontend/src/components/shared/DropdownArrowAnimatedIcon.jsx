import React from "react";
import { AiOutlineDown } from "react-icons/ai";

const DropdownArrowAnimatedIcon = ({ isOpen }) => {
  return (
    <AiOutlineDown
      className={`transition-transform duration-200 ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  );
};

export default DropdownArrowAnimatedIcon;