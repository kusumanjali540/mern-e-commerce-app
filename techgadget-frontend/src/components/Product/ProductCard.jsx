import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnLoadImg = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className="flex flex-col justify-between items-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full"
        style={{
          height: isLoaded ? "auto" : "10rem",
        }}
      >
        <img
          src={product.pictures[0]}
          alt={product.name}
          onLoad={handleOnLoadImg}
          className={`w-full object-contain transition-opacity duration-300 ${
            isHovered ? "opacity-60" : ""
          }`}
        />
      </div>

      <h2 className={`mb-2 ${isHovered ? "underline" : ""}`}>{product.name}</h2>

      <p>${product.variants[0].price} USD</p>

      <p>
        {product.discount > 0 ? product.price * (1 - product.discount) : ""}
      </p>
    </div>
  );
};

export default ProductCard;
