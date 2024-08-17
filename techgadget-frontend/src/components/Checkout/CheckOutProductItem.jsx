import React, { useEffect, useState } from "react";
import { calculateTotalPriceOfCartItem } from "../../services/helper";

const CheckOutProductItem = ({ items, isOpen }) => {
  console.log(items);

  let content;
  if (items.length > 0) {
    content = items.map((item, index) => {
      const itemTotalPrice = item.product.product.price * item.quantity;

      console.log(itemTotalPrice);

      return (
        <div key={index} className="flex flex-row items-center">
          <div className=" relative w-24 h-24 rounded-xl border-2 border-slate-400">
            <div className="px-2 rounded-full absolute bg-slate-500 bottom-full left-full translate-x-[-50%] translate-y-[50%]">
              {item.quantity}
            </div>
            <img
              src={item.product.product.pictures[0]}
              alt="product"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col flex-1 justify-center px-6">
            <div className="w-full">{item.product.product.name}</div>
            <div className="text-slate-500">
              {Object.entries(
                item.product.product.properties
              ).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
            </div>
          </div>
          <div>$ {itemTotalPrice} USD</div>
        </div>
      );
    });
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-slate-100 ${
        isOpen ? "max-h-screen" : "max-h-0"
      } transition-all duration-500 overflow-hidden`}
    >
      <div className="px-4 flex flex-col gap-4 py-4">{content}</div>
    </div>
  );
};

export default CheckOutProductItem;
