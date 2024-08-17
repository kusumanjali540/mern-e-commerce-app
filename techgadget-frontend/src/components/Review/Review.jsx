import React, { useState, useMemo, useCallback } from "react";
import Rating from "react-rating";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import ReviewItems from "./ReviewItems";
import ReviewWriting from "./ReviewWriting";
import Dropdown from "../shared/Dropdown";
import { useFetchReviewsQuery } from "../../features";

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
  const { id: productId } = useParams();
  const { data, error, isFetching } = useFetchReviewsQuery({ productId });

  const sortOptions = useMemo(
    () => [
      { val: "mostRecent", name: "Most Recent" },
      { val: "highestRating", name: "Highest Rating" },
      { val: "lowestRating", name: "Lowest Rating" },
    ],
    []
  );

  const handleSortChange = useCallback((selectedOption) => {
    setSortBy(selectedOption);
    console.log("Review handleSortChange " + selectedOption);
  }, []);

  const handleToggleReview = useCallback(() => {
    setIsOpenWritingReview((prev) => !prev);
  }, []);

  const sortedReviews = useMemo(() => {
    if (!data || !data.reviews) return [];

    const reviews = [...data.reviews];

    switch (sortBy) {
      case "highestRating":
        return reviews.sort((a, b) => b.star - a.star);
      case "lowestRating":
        return reviews.sort((a, b) => a.star - b.star);
      case "mostRecent":
      default:
        return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [data, sortBy]);

  return (
    <div className="flex flex-col items-center gap-y-6 px-4 md:px-20 lg:px-48 py-8">
      <h1 className="text-2xl">Customer Reviews</h1>
      <div className="w-full flex flex-col justify-center gap-2 items-center">
        <div className="text-2xl">
          <Rating
            readonly
            emptySymbol={<AiOutlineStar />}
            fullSymbol={<AiFillStar />}
            initialRating={isFetching ? 4.34 : data.averageStar.toFixed(2)}
          />
        </div>
        <div className="text-slate-500">
          Based on {isFetching ? "-" : data.reviews.length} review(s)
        </div>
        <button
          className="bg-black text-white w-3/4 h-10"
          onClick={handleToggleReview}
        >
          Write a review
        </button>
        <div className="flex flex-col w-full justify-center pb-6 items-center">
          {[5, 4, 3, 2, 1].map((star) => (
            <Link
              key={star}
              className="flex flex-row w-full justify-center items-center"
            >
              <Rating
                readonly
                emptySymbol={<AiOutlineStar />}
                fullSymbol={<AiFillStar />}
                initialRating={star}
              />
              <ProgressBar
                value={isFetching ? 60 : (data.starCount[star] / data.reviews.length) * 100}
              />
              {`(${isFetching ? 60 : data.starCount[star]})`}
            </Link>
          ))}
        </div>
        <ReviewWriting
          className="w-full transition-all bg-red-300"
          style={{ height: `${isOpenWritingReview ? "56rem" : "0px"}` }}
          onClose={handleToggleReview}
        />
        <div className="w-full h-10 flex items-center">
          <Dropdown onChange={handleSortChange} options={sortOptions} />
        </div>
        <ReviewItems data={{ ...data, reviews: sortedReviews }} error={error} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default Review;
