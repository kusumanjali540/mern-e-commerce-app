import React from "react";
import Review from "../components/Review/Review";
import RecomendedProduct from "../components/ProductDetail/RecomendedProduct";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import { useParams } from "react-router-dom";
import { useFetchProductQuery } from "../features";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useFetchProductQuery(id);

  return (
    <div className="px-4 py-8 w-full">
      <ProductInfo
        product={data?.product}
        isFetching={isFetching}
        error={error}
      />
      <RecomendedProduct
        product={data?.product}
        isFetching={isFetching}
        error={error}
      />
      <Review product={data?.product} isFetching={isFetching} error={error} />
    </div>
  );
};

export default ProductDetailPage;
