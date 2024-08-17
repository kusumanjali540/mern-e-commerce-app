import React, { useState } from "react";

const OnClickAnimatedButton = ({ children, className }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 200); // 200ms timeout to match the animation duration
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white font-semibold rounded-md transition-transform duration-200 ease-in-out
        ${clicked ? "bg-slate-400 scale-95" : "bg-black scale-100"}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default OnClickAnimatedButton;
