import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";

const Canrousel = ({ slides, className }) => {
  const [current, setCurrent] = useState(0);
  
  const previousSlide = () => {
    if (current === 0) {
      setCurrent(slides.length - 1);
    } else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className={`slider flex flex-col ${className}`}>
      <div className="w-full h-full overflow-hidden relative">
        <div
          className="flex transition-all"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((pic, index) => (
            <img key={index} src={pic} alt="pictures" className="object-cover" />
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-12 mt-8 justify-center items-center h-16 text-white">
        <div>
          <button
            className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-full text-slate-600"
            onClick={previousSlide}
          >
            <AiOutlineLeft />
          </button>
        </div>
        <div className="text-slate-600">
          {current + 1} / {slides.length}
        </div>
        <div>
          <button
            className="w-10 h-10  flex justify-center items-center bg-slate-200 rounded-full text-slate-600"
            onClick={nextSlide}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canrousel;
