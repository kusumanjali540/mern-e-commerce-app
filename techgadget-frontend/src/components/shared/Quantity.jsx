import React from "react";

const Quantity = ({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  disabled,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-32 h-10 border border-black">
      <button
        disabled={quantity === 1 || disabled}
        className={`h-full w-1/4 ${
          disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={handleDecreaseQuantity}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        disabled={disabled}
        className={`h-full w-1/4 ${
          disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={handleIncreaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
