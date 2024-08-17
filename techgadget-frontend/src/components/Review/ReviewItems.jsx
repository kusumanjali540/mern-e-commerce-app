import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { useFetchReviewsQuery } from "../../features";
import { useParams } from "react-router-dom";
import ReviewItemSkeleton from "../loadingSkeletons/ReviewItemSkeleton";
import { getTimeFromISODateString } from "../../services/helper";

const ReviewItems = ({ data, error, isFetching }) => {
  
  if (isFetching) {
    return <ReviewItemSkeleton numberOfItem={4} />;
  }
  if (error) {
    return <div>Error has occured in fetching reviews!</div>;
  }

  console.log("Reviews", data.reviews);

  if (data?.reviews?.length === 0) {
    return (
      <div className="text-3xl font-medium mt-5">
        Be the first one to leave a review here!
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {data.reviews.map((item, index) => (
        <div key={index} className="border-t-2 py-4">
          <div className="flex flex-row w-full justify-between">
            <Rating
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
              initialRating={item.star}
            />
            <p>{getTimeFromISODateString(item.createdAt)}</p>
          </div>
          <div className="flex flex-row gap-x-2 mb-2">
            <div className="w-14 h-14">
              <img src="/img/anonymous.png" alt="User" className="object-cover"/>
            </div>
            <div className="text-xl">{item.reviewer}</div>
          </div>
          <div className="font-semibold">{item.title}</div>
          <div>{item.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewItems;
