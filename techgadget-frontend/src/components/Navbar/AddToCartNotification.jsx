import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, useFetchProductQuery } from "../../features";
import { Link } from "react-router-dom";

const AddToCartNotification = () => {
  const cartItemCount = useSelector((state) => state.cart.count);
  const isOpen = useSelector((state) => state.notification.isOpen);
  const addedProduct = useSelector((state) => state.notification.data);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div
      className="absolute top-full left-0 md:left-1/2 md:w-1/2 w-full z-50 bg-white shadow-lg bottom-0 transition-all overflow-hidden"
      style={{
        height: isOpen ? "20rem" : "0",
      }}
    >
      <div className="w-full h-full relative px-8 py-4">
        <button className="absolute top-4 right-8" onClick={handleCloseModal}>
          <AiOutlineClose />
        </button>
        <div className="flex flex-row items-center">
          <AiOutlineCheck />
          Item added to your cart
        </div>
        <div className="flex flex-row gap-4 my-4">
          <div className="w-20 h-20">
            <img
              src="/img/hero.png"
              alt="hero"
              className="object-cover h-full"
            />
          </div>
          <div className="flex flex-col">
            <div>{addedProduct?.name}</div>
            {addedProduct &&
              Object.entries(
                addedProduct.variants[addedProduct.variant].properties
              ).map(([key, value]) => (
                <div key={key}>
                  <p>
                    {key}: {value}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <Link to="/cart">
          <button
            className="w-full h-12 border-2 mb-2"
            onClick={handleCloseModal}
          >
            View cart ({cartItemCount})
          </button>
        </Link>

        <Link>
          <button
            className="w-full h-12 border-2 mb-2 bg-black text-white"
            onClick={handleCloseModal}
          >
            Check out
          </button>
        </Link>

        <button className="w-full underline" onClick={handleCloseModal}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default AddToCartNotification;
