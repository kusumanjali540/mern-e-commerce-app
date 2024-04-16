import React from "react";
import OrderSummary from "../components/Checkout/OrderSummary";
import ContactDelivery from "../components/Checkout/ContactDelivery";
import Payment from "../components/Checkout/Payment";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-20 lg:px-48 py-8">
      <div className="w-full">
        <ContactDelivery />
        <Payment />
        <div>
          <button>Pay now</button>
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};

export default CheckoutPage;
