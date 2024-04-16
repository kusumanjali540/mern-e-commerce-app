import React from "react";
import Hero from "../components/Home/Hero";
import FeaturedProduct from "../components/Home/FeaturedProduct";
import StandoutProduct from "../components/Home/StandoutProduct";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FeaturedProduct />
      <StandoutProduct />
    </div>
  );
};

export default Home;
