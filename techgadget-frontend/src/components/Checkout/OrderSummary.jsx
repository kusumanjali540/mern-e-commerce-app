import React, { useEffect, useState } from "react";
import CheckOutProductItem from "./CheckOutProductItem";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import {
  calculateShippingFee,
  calculateTotalPriceOfCartItem,
} from "../../services/helper";
import OnClickAnimatedButton from "../shared/OnClickAnimatedButton";
import DropdownArrowAnimatedIcon from "../shared/DropdownArrowAnimatedIcon";

const OrderSummary = ({ items, deliveryAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleToggleOrderSummary = () => {
    console.log("I got click");
    setIsOpen(!isOpen);
  };

  console.log("Item?", items[0]?.product);

  useEffect(() => {
    //Calculate total and shipping fee
    const total = items.reduce((total, item) => {
      return total + item.product.product.price * item.quantity;
    }, 0);

    // const calculatedShippingFee = calculateShippingFee(
    //   deliveryAddress.lat,
    //   deliveryAddress.lon
    // );

    // console.log(calculatedShippingFee);

    // setShippingFee(calculatedShippingFee);
    setTotalPrice(total);
  }, [items, deliveryAddress]);

  return (
    <div className="flex flex-col border border-black w-full bg-slate-100 md:px-16 lg:px-44">
      <div className="flex flex-row justify-between items-center px-4 py-4 bg-slate-100 border-b border-slate-300">
        <button
          onClick={handleToggleOrderSummary}
          className="flex flex-row justify-center items-center gap-2 text-blue-900"
        >
          {isOpen ? <>Hide order summary</> : <>Show order summary</>}
          <DropdownArrowAnimatedIcon isOpen={isOpen} />
        </button>
        <div className="font-bold">$ {totalPrice.toFixed(2)} USD</div>
      </div>
      <CheckOutProductItem items={items} isOpen={isOpen} />
      <div className="px-4 py-8">
        <div className="flex flex-row">
          <input
            type="text"
            className="px-4 h-10 border flex-1"
            placeholder="Discount code"
          />
          <OnClickAnimatedButton className="border bg-slate-300 px-2 py-1 ml-2">
            Apply
          </OnClickAnimatedButton>
        </div>
        <div className="grid grid-cols-2 gap-y-1 pt-4">
          <div>Subtotal</div>
          <div className="flex flex-row justify-end font-medium">
            ${totalPrice.toFixed(2)} USD
          </div>
          <div>Shipping</div>
          <div className="flex flex-row justify-end font-medium">
            {/* {shippingFee !== null
              ? `$${shippingFee} USD`
              : "Enter shipping address"} */}
            Shipping free is included in item price
          </div>
          <div className="font-bold">Total</div>
          <div className="flex flex-row justify-end text-xl font-bold">
            $ {totalPrice.toFixed(2)} USD
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
