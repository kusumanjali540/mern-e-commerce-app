import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { resetCart, useEditOrderMutation } from "../../features";
import { useDispatch } from "react-redux";

const CheckoutSuccess = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();

  console.log(orderId);

  const [editOrder, { isEditingOrderLoading, isEditingOrderError }] =
    useEditOrderMutation();

  useEffect(() => {
    const updateOrderStatus = async () => {
      const formData = {
        status: "Paid",
      };

      await editOrder({ formData, orderId: orderId });

      // Reset cart if needed
      dispatch(resetCart());
    };

    updateOrderStatus();
  }, [orderId, dispatch, editOrder]);
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Checkout Success</h1>
        <p>Your order has been successfully processed.</p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
