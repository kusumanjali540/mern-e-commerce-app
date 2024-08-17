import React from "react";
import ResponsiveSquare from "../shared/ResponsiveSquare";

const OrderItem = ({
  quantity,
  name,
  price,
  orderDate,
  status,
  picture,
  properties,
}) => {
  console.log(properties);

  return (
    <tr className="w-full h-full my-4">
      <td className="w-1/4 h-fit md:w-1/6 lg:w-[12%] 2xl:w-1/12">
        <div className="min-w-20 min-h-20 md:w-full">
          <ResponsiveSquare src={picture} alt={name} width="100%" />
        </div>
      </td>
      <td className="w-2/3">
        <div className="px-4">
          {name}
          <div className="flex flex-row gap-x-2">
            <span className="font-semibold">Date: </span>
            {orderDate}
          </div>
          <div className="flex flex-row gap-x-2">
            {Object.entries(properties).map(([key, value], index) => (
              <span key={index} className="mr-2">
                <span className="font-bold">{key}:</span> {value}
                {index < Object.entries(properties).length - 1 && (
                  <span>, </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="mobile block md:hidden">
          <div className="flex flex-row justify-start items-center gap-x-2 h-full px-4">
            <span className="font-semibold">Quantity: </span> {quantity}
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-row justify-start items-center gap-x-2 h-full pr-4">
          <span className="font-semibold">Quantity: </span>
          {quantity}
        </div>
      </td>
      <td className="">
        <div className="w-full h-full flex justify-center items-center">
          ${(quantity * price).toFixed(2)}
        </div>
      </td>
    </tr>
  );
};

export default OrderItem;
