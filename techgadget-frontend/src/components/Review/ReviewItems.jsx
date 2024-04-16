import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";

const ReviewItems = ({review}) => {
  return (
    <div className="flex flex-col">
      {Array(4)
        .fill(0)
        .map((item, index) => (
          <div key={index} className="border-t-2 py-4">
            <div className="flex flex-row w-full justify-between">
              <Rating
                readonly
                emptySymbol={<AiOutlineStar />}
                fullSymbol={<AiFillStar />}
                initialRating={5}
              />
              <p>2/12/2024</p>
            </div>
            <div className="flex flex-row gap-x-2 mb-2">
              <div className="w-14 h-14 bg-red-500"></div>
              <div className="text-xl">John</div>
            </div>
            <div className="font-semibold">Very good</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit sit aliquam quibusdam dolorum? Fugiat ex
              voluptatibus placeat, esse sed cumque eaque sint. Omnis delectus
              non eaque accusamus consequatur autem nam hic pariatur aut fugit
              minus nemo, recusanda.
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewItems;
