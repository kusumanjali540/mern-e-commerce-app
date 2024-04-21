import React, { useEffect, useState } from "react";
import CheckOutProductItem from "./CheckOutProductItem";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import {
  calculateShippingFee,
  calculateTotalPriceOfCartItem,
} from "../../services/helper";

const OrderSummary = ({ items, deliveryAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState();
  const handleToggleOrderSummary = () => {
    console.log("I got click");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //Calculate total and shipping fee
    const total = items.reduce((total, item) => {
      return (
        total +
        calculateTotalPriceOfCartItem({
          product: item.product,
          variant: item.variant,
          quantity: item.quantity,
        })
      );
    }, 0);

    console.log(deliveryAddress);
    const calculatedShippingFee = calculateShippingFee(
      deliveryAddress.lat,
      deliveryAddress.lon
    );

    console.log(calculatedShippingFee);

    setShippingFee(calculatedShippingFee);
    setTotalPrice(total);
  }, [items, deliveryAddress]);

  return (
    <div className="flex flex-col border border-black w-full bg-slate-100">
      <div className="flex flex-row justify-between items-center px-4 py-4 bg-slate-100 border-b border-slate-300">
        <button
          onClick={handleToggleOrderSummary}
          className="flex flex-row justify-center items-center gap-2 text-blue-900"
        >
          {isOpen ? (
            <>
              Hide order summary <AiOutlineUp />
            </>
          ) : (
            <>
              Show order summary <AiOutlineDown />
            </>
          )}
        </button>
        <div className="font-bold">$ {totalPrice} USD</div>
      </div>
      <CheckOutProductItem items={items} isOpen={isOpen} />
      <div className="px-4 py-8">
        <div className="flex flex-row">
          <input
            type="text"
            className="px-4 h-10 border flex-1"
            placeholder="Discount code"
          />
          <button className="border bg-slate-300 px-2 py-1 ml-2">Apply</button>
        </div>
        <div className="grid grid-cols-2 gap-y-1 pt-4">
          <div>Subtotal</div>
          <div className="flex flex-row justify-end font-medium">
            ${totalPrice.toFixed(2)} USD
          </div>
          <div>Shipping</div>
          <div className="flex flex-row justify-end font-medium">
            {shippingFee !== null
              ? `$${shippingFee} USD`
              : "Enter shipping address"}
          </div>
          <div className="font-bold">Total</div>
          <div className="flex flex-row justify-end text-xl font-bold">
            $
            {shippingFee !== null
              ? (parseFloat(shippingFee) + parseFloat(totalPrice)).toFixed(2)
              : totalPrice.toFixed(2)}{" "}
            USD
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
