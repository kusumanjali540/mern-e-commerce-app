import React, { useState } from "react";
import Rating from "react-rating";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReviewItems from "./ReviewItems";
import ReviewWriting from "./ReviewWriting";
import Dropdown from "../shared/Dropdown";

const ProgressBar = ({ value }) => {
  return (
    <div className="w-[40%] bg-gray-200 h-4 overflow-hidden">
      <div className="h-full bg-black" style={{ width: `${value}%` }}></div>
    </div>
  );
};

const Review = () => {
  const [isOpenWritingReview, setIsOpenWritingReview] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const sortOptions = [
    {
      val: "mostRecent",
      name: "Most Recent",
    },
    {
      val: "highestRating",
      name: "Highest Rating",
    },
    {
      val: "lowestRating",
      name: "Lowest Rating",
    },
  ];

  const handleSortChange = (selectedOption) => {
    setSortBy(selectedOption);
    console.log("Review handleSortChange " + selectedOption);
  };

  const handleToggleReview = () => {
    setIsOpenWritingReview(!isOpenWritingReview);
  };

  return (
    <div className="flex flex-col items-center gap-y-6 px-4 md:px-20 lg:px-48 py-8">
      <h1 className="text-2xl">Customer Reviews</h1>
      <div className="w-full flex flex-col justify-center gap-2 items-center">
        <div className="text-2xl">
          <Rating
            readonly
            emptySymbol={<AiOutlineStar />}
            fullSymbol={<AiFillStar />}
            initialRating={4.34}
          />
        </div>
        <div className="text-slate-500">Based on {3} review(s)</div>
        <button
          className="bg-black text-white w-3/4 h-10"
          onClick={handleToggleReview}
        >
          Write a review
        </button>
        <div className="flex flex-col w-full justify-center pb-6 items-center">
          <Link className="flex flex-row w-full justify-center items-center">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={5}
            />
            <ProgressBar value={60} />
            {`(${60})`}
          </Link>
          <Link className="flex flex-row w-full justify-center items-center">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={4}
            />
            <ProgressBar value={60} />
            {`(${60})`}
          </Link>
          <Link className="flex flex-row w-full justify-center items-center">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={3}
            />
            <ProgressBar value={60} />
            {`(${60})`}
          </Link>
          <Link className="flex flex-row w-full justify-center items-center">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={2}
            />
            <ProgressBar value={60} />
            {`(${60})`}
          </Link>
          <Link className="flex flex-row w-full justify-center items-center">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={1}
            />
            <ProgressBar value={60} />
            {`(${60})`}
          </Link>
        </div>
        <ReviewWriting
          className="w-full transition-all bg-red-300"
          style={{
            height: `${isOpenWritingReview ? "56rem" : "0px"}`,
          }}
          onClose={handleToggleReview}
        />
        <div className="w-full h-10 flex items-center">
          <Dropdown onChange={handleSortChange} options={sortOptions} />
        </div>
        <ReviewItems sortBy={sortBy} />
      </div>
    </div>
  );
};

export default Review;
