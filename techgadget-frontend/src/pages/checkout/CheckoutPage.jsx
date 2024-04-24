import React, { useEffect, useState } from "react";
import OrderSummary from "../../components/Checkout/OrderSummary";
import ContactDelivery from "../../components/Checkout/ContactDelivery";
import Payment from "../../components/Checkout/Payment";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAddress,
  useAddCustomerMutation,
  useAddOrderMutation,
  useCreateCheckoutSessionMutation,
} from "../../features";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const deliveryAddress = useSelector((state) => state.address);
  const [addCustomer, { isLoading, isError }] = useAddCustomerMutation();
  const [addOrder, { isOrderLoading, isOrderError }] = useAddOrderMutation();
  const [createCheckoutSession, { isCheckoutLoading, isCheckoutError }] = useCreateCheckoutSessionMutation();
  const [productArr, setProductArr] = useState([]);

  console.log(productArr);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      const items = [];
      for (const cartItem of cartItems) {
        try {
          const response = await fetch(
            `https://mern-e-commerce-app-api.vercel.app/product/${cartItem.productId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          const data = await response.json();
          items.push({
            product: data.product,
            quantity: cartItem.quantity,
            variant: cartItem.variant,
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
      // Update state with fetched products
      setProductArr(items);
    };

    fetchProduct();
  }, [cartItems]);

  const handleSubmit = async () => {
    // Push buyer's info to the database
    const customer = {
      email: deliveryAddress.emailPhone,
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      address: deliveryAddress.address,
      country: deliveryAddress.country,
      city: deliveryAddress.city,
      state: deliveryAddress.stateName,
      zipcode: deliveryAddress.zipcode,
      status: "Guest",
    };

    try {
      const stripe = await loadStripe(
        "pk_test_51P7m8MHoqNfcMTanLbQFlBWXl5FbUMJWMT8J8Onjmw3EXZsfNWJnVt59JnWZXSXWYQXTRG67EwxLtsj3hQBwEwNC00GjaSDMZm"
      );

      const order = {
        products: productArr,
      };

      const session = await createCheckoutSession(order).unwrap();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      // const customerId = resultAddCustomer._id;
      // Create a order with pending payment

      // const order = {
      //   // customerId: customerId,
      //   // products: productArr,
      //   // totalQuantity,
      //   // totalPrice,
      //   status: "Pending",
      // };

      // console.log(isLoading, isError);

      // if (!isLoading && !isError) {
      //   console.log("I Toast?");
      //   toast.success("Add new customer successfully!");
      // }

      dispatch(resetAddress());
    } catch (err) {
      console.log(err);
    //   toast.error(err.data.message);
    //   err.data.data?.forEach((msg) => {
    //     toast.error(msg);
    //   });
    }

    // Verify payment and change payment status
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center px-4 md:px-20 lg:px-48 py-8">
        <div className="w-full">
          <ContactDelivery />
          <Payment />
        </div>
      </div>
      <OrderSummary items={productArr} deliveryAddress={deliveryAddress} />
      <div className="flex flex-col px-4 py-8 justify-center items-center">
        <button
          className="w-full h-10 border bg-black text-white"
          onClick={handleSubmit}
        >
          Pay now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
