import React from "react";

const Quantity = ({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-32 h-10 border border-black">
      <button
        disabled={quantity === 1}
        className="h-full w-1/4"
        onClick={handleDecreaseQuantity}
      >
        -
      </button>
      <span>{quantity}</span>
      <button className="h-full w-1/4" onClick={handleIncreaseQuantity}>
        +
      </button>
    </div>
  );
};

export default Quantity;
