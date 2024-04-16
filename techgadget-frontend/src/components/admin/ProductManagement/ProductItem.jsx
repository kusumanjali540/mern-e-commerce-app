import React from "react";

const ProductItem = ({ product, index, onClick }) => {
  const handleOpenEditModal = (product) => {
    onClick(product);
  };

  console.log(product);

  return (
    <div
      key={index}
      className="w-full h-20 bg-slate-200 rounded-lg mb-4 flex flex-row justify-between pr-8"
    >
      <div className="w-3/4 flex flex-row">
        <div className="w-20 h-full bg-black border">
          <img
            src={product.pictures[0]}
            alt="pictures"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">{product.name}</div>
      </div>

      <div className="flex items-center">
        Price: {product.variants[0].price}
      </div>

      <div className="h-full flex items-center">
        <button
          onClick={() => handleOpenEditModal(product)}
          className="bg-black text-white px-4 py-4"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
