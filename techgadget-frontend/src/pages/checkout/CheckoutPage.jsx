import React, { useEffect, useRef, useState } from "react";
import OrderSummary from "../../components/Checkout/OrderSummary";
import ContactDelivery from "../../components/Checkout/ContactDelivery";
import Payment from "../../components/Checkout/Payment";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAddress,
  resetCart,
  useAddCustomerMutation,
  useAddOrderMutation,
  useCreateCheckoutSessionMutation,
  useEditOrderMutation,
  useLazyFetchProductQuery,
} from "../../features";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyFetchProductWithSelectedVariantQuery } from "../../features/apis/productsApi";
import { showErrorToast } from "../../services/showErrorToast";
import { emptyCart } from "../../services/useLocalStorageService";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const deliveryAddress = useSelector((state) => state.address);
  const [addCustomer, { isLoading, isError }] = useAddCustomerMutation();
  const [addOrder, { isOrderLoading, isOrderError }] = useAddOrderMutation();
  const [orderItems, setOrderItems] = useState([]);

  const addressFormRef = useRef();

  const [createCheckoutSession, { isCheckoutLoading, isCheckoutError }] =
    useCreateCheckoutSessionMutation();

  const [trigger, { isFetching: isFetchingOrderItem }] =
    useLazyFetchProductWithSelectedVariantQuery();

  const customer = {
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Maple Street",
    country: "United States",
    city: "Springfield",
    state: "Illinois",
    zipcode: "62704",
  };

  console.log(isFetchingOrderItem);
  console.log("Order Here", orderItems);

  const preFillAddressInformation = () => {
    try {
      // Get User Information
      // setInput
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch product data for each cart item and update state
    const fetchProducts = async () => {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await trigger(item).unwrap();
          return { ...item, product };
        })
      );
      setOrderItems(updatedCartItems);
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }

    preFillAddressInformation();
  }, [cartItems, trigger]);

  const handleSubmit = async () => {
    try {
      // Create Order With Pending Status
      console.log("This is item to order", orderItems);

      const order = await addOrder({
        items: orderItems,
        status: "Pending",
      }).unwrap();

      console.log("Return order", order);

      // Trigger stripe
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

      const session = await createCheckoutSession(order).unwrap();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      // If successfully, redirect to checkout success, payment status and other handling after payment are proceed there
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center px-4 md:px-20 lg:px-48 py-8">
        <div className="w-full">
          <ContactDelivery ref={addressFormRef} />
          <Payment />
        </div>
      </div>
      {isFetchingOrderItem ? (
        "Loading Order Items..."
      ) : orderItems.length > 0 ? (
        <OrderSummary items={orderItems} deliveryAddress={deliveryAddress} />
      ) : (
        "Error has occured!"
      )}
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
