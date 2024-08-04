import React, { useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import ProductCard from "../components/Product/ProductCard";
import ProductCardSkeleton from "../components/loadingSkeletons/ProductCardSkeleton";
import { Link, useParams } from "react-router-dom";
import { useFetchProductsQuery } from "../features";

const Product = () => {
  const numberOfResultRef = useRef("...");
  const { categoryName } = useParams();
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useFetchProductsQuery({
    category: categoryName,
    page: page || 1,
    perPage: 4,
  });

  const handleSwitchPage = (newPage) => {
    setPage(newPage);
  };

  let content;
  if (isFetching) {
    content = <ProductCardSkeleton cards={4} />;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else {
    console.log(data);
    console.log(categoryName);
    content = data.products.map((product, index) => {
      return (
        <Link key={index} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      );
    });

    numberOfResultRef.current = data.totalItems;
  }

  return (
    <div className="w-full px-4 lg:px-48 py-8">
      <div className="mb-16">
        <h1 className="text-3xl">Products</h1>
      </div>

      <div className="flex flex-row justify-between items-center mb-4 text-slate-500">
        <button className="flex flex-row justify-between items-center gap-x-4 focus:underline">
          <IoFilterOutline />
          Filter and Sort
        </button>
        <p>{numberOfResultRef.current} products</p>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
        {content}
      </div>
      <div className="flex flex-row justify-center gap-4 mt-2">
        {data
          ? [...Array(Math.ceil(data.totalItems / 4))].map((_, index) => (
              <button
                key={index}
                onClick={() => handleSwitchPage(index + 1)}
                className={` text-white p-2 ${
                  page === index + 1 ? "bg-black" : "bg-slate-600"
                }`}
              >
                {index + 1}
              </button>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Product;
