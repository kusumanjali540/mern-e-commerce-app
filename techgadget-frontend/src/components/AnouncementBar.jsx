import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const AnouncementBar = () => {
  return (
    <div className="px-7 py-2 text-sm bg-gray-800 h-[5vh]">
      <Link className="hover:underline">
        <p className="text-center text-white leading-3">
          Enjoy free shipping on every purchase, with items beginning at just
          $12.99!
          <AiOutlineArrowRight className="text-2xl inline pb-1" />
        </p>
      </Link>
    </div>
  );
};

export default AnouncementBar;
