import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <div key={index} className="flex flex-col justify-center items-start">
        <div className="w-full h-40 mb-2">
          <Skeleton height="100%" />
        </div>
        <div className="w-full mb-2">
          <Skeleton height="100%" />
        </div>
        <div className="w-full mb-2">
          <Skeleton height="100%" />
        </div>
        <div className="w-full">
          <Skeleton height="100%" />
        </div>
      </div>
    ));
};

export default ProductCardSkeleton;
