import React from "react";
import Skeleton from "react-loading-skeleton";

const CartItemSkeleton = () => {
  return (
    <tr className="w-full h-full">
      <td className="w-1/6">
        <Skeleton height={100} width={100}/>
      </td>
      <td className="w-auto">
        <Skeleton count={3}/>
      </td>
      <td className="w-1/6">
        <Skeleton />
      </td>
      <td className="w-1/12">
        <Skeleton />
      </td>
    </tr>
  );
};

export default CartItemSkeleton;
