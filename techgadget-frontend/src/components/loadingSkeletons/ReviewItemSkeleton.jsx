import React from "react";
import Skeleton from "react-loading-skeleton";

const ReviewItemSkeleton = ({ numberOfItem }) => {
  return Array(numberOfItem)
    .fill(0)
    .map((item, index) => (
      <div key={index} className="w-full h-10">
        <Skeleton height="100%" />
      </div>
    ));
};

export default ReviewItemSkeleton;
