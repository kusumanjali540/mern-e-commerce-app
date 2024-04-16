import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex flex-col justify-center items-center gap-y-4 px-10 h-[40vh] lg:h-[85vh] bg-hero bg-no-repeat bg-center bg-cover text-white">
      <h1 className="text-5xl font-semibold text-center z-20">
        Come and visit our Store!
      </h1>
      <p className="text-center z-20">
        Discover Unique and Affordable Wireless Tech Gadgets with Our
        Budget-Friendly Finds!
      </p>
      <Link to="products/all" className="z-20">
        <button className="w-28 h-12 border">Shop all</button>
      </Link>

      <div className="absolute w-full h-full top-0 left-0 bg-slate-950 opacity-70 z-10"></div>
    </div>
  );
};

export default Hero;
