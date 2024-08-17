import React from "react";
import { useFetchProductsQuery } from "../../features";
import ProductCardSkeleton from "../loadingSkeletons/ProductCardSkeleton";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";

const RecomendedProduct = () => {
  const { data, error, isFetching } = useFetchProductsQuery({
    category: 'all',
    page: 1,
    perPage: 4,
  });

  let content;
  if (isFetching) {
    content = <ProductCardSkeleton cards={4} />;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else {
    // console.log(data);
    content = data.products.map((product, index) => {
      return (
        <Link key={index} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      );
    });
  }

  return (
    <div className="w-full px-4 lg:px-48 py-8">
      <h1 className="text-2xl mb-8">You may also like</h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
        {content}
      </div>
    </div>
  );
};

export default RecomendedProduct;
